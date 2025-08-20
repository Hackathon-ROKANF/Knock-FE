import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import ScoreProgress from '../components/ScoreProgress'
import ResultContent from '../contents/ResultContent'
import { DownIcon } from '../assets/icons'
import { useDeedUploadStore } from '../store/useDeedUploadStore'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import ConfirmModal from '../components/ConfirmModal'

export default function ResultPage() {
  const navigate = useNavigate()
  const { analysisResult, clear } = useDeedUploadStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollIconRef = useRef<HTMLDivElement>(null)
  const detailSectionRef = useRef<HTMLDivElement>(null)
  const [showContent, setShowContent] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const [text, setText] = useState('')

  // 분석 결과가 없으면 업로드 페이지로 리다이렉트 (localStorage 확인 후)
  useEffect(() => {
    // localStorage에서 분석 결과를 확인하고 약간의 지연을 둠
    const timer = setTimeout(() => {
      if (!analysisResult?.risk_probability) {
        navigate('/')
      }
    }, 100) // 100ms 지연으로 localStorage 복원 대기

    return () => clearTimeout(timer)
  }, [analysisResult, navigate])

  const handleShowContent = () => {
    // 컨텐츠 표시
    setShowContent(true)

    // 컨텐츠가 DOM에 렌더링된 후 스크롤 실행
    setTimeout(() => {
      if (detailSectionRef.current) {
        // scrollIntoView 하나만 사용하여 부드러운 스크롤 구현
        detailSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      }
    }, 200) // 약간 더 긴 지연으로 DOM 렌더링 완료 대기
  }

  return (
    <div
      ref={containerRef}
      className='container h-screen no-scrollbar bg-white overflow-x-hidden p-6 overflow-auto relative'>
      <div
        className='absolute top-4 left-4 z-10'
        onClick={() => {
          setText('초기화면으로 돌아갈까요?')
          setShowConfirmModal(true)
        }}>
        <BackButton disabled={true} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        {/* Page Header */}

        <PageHeader
          title='등기부등본 검토 결과입니다'
          subtitle='분석이 완료되었어요'
        />

        {/* 점수 섹션 */}
        <ScoreProgress
          riskProbability={analysisResult?.risk_probability || '0%'}
          size={240}
          strokeWidth={14}
          animationDuration={2.5}
          className='mb-[40%]'
        />

        <div
          ref={scrollIconRef}
          className={`flex flex-col text-center items-center cursor-pointer transition-all duration-300 ${showContent ? 'opacity-50 pointer-events-none' : 'hover:scale-105'}`}
          onClick={handleShowContent}>
          <div className='mb-2'>클릭하여 자세한 분석 결과를 확인하세요</div>
          <DownIcon
            size={35}
            color='#9ca3af'
            className={`transition-all duration-300 ${showContent ? '' : 'animate-bounce'}`}
          />
        </div>

        {/* 상세 정보 섹션 - 처음에는 완전히 숨김 */}
        {showContent && (
          <motion.div
            ref={detailSectionRef}
            className='mt-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
            <ResultContent />

            <div className='mt-8 pt-6 border-t border-gray-200'>
              <p className='text-center text-gray-600 mb-2'>부동산은 등기부등본 이외에도 고려할 사항이 많아요</p>
              <p className='text-center text-gray-600 mb-6'>자세한 사항은 전문가와 상담하는걸 추천해요</p>
            </div>
          </motion.div>
        )}

        {/* 액션 버튼 - 처음에는 완전히 숨김 */}
        {showContent && (
          <motion.div
            className='space-y-3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}>
            <Button
              onClick={() => navigate('/expert')}
              variant='primary'>
              전문가 매칭 받기
            </Button>

            <Button
              onClick={() => {
                setText('다른 등기부등본을 분석할까요?')
                setShowConfirmModal(true)
              }}
              variant='secondary'>
              다른 등기부등본 분석하기
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* 확인 모달 */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          clear()
          navigate('/upload')
        }}
        title={text}
        message='등기부등본을 분석한 결과가 사라져요'
      />
    </div>
  )
}
