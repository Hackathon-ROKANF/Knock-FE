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
import QuestionButton from '../components/QuestionButton'

export default function ResultPage() {
  const navigate = useNavigate()
  const { analysisResult, clear } = useDeedUploadStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollIconRef = useRef<HTMLDivElement>(null)
  const detailSectionRef = useRef<HTMLDivElement>(null)
  const [showContent, setShowContent] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const [text, setText] = useState('')

  // localStorage 확인 후 분석 결과가 없으면 업로드 페이지로 리다이렉트
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!analysisResult?.risk_probability) {
        navigate('/')
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [analysisResult, navigate])

  // 버튼 클릭 시 컨텐츠 표시 & 스크롤
  const handleShowContent = () => {
    setShowContent(true)

    setTimeout(() => {
      if (detailSectionRef.current) {
        detailSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      }
    }, 200)
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

      <div className='absolute top-4 right-4 z-10'>
        <QuestionButton />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <PageHeader
          title='분석이 완료되었어요'
          subtitle=''
        />

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
