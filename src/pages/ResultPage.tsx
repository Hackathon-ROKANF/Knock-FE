import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import ScoreProgress from '../components/ScoreProgress'
import ResultContent from '../components/ResultContent'
import { DownIcon } from '../components/icons'
import { useDeedUploadStore } from '../store/useDeedUploadStore'

export default function ResultPage() {
  const navigate = useNavigate()
  const { analysisResult, clear } = useDeedUploadStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollIconRef = useRef<HTMLDivElement>(null)
  const detailSectionRef = useRef<HTMLDivElement>(null)
  const [showContent, setShowContent] = useState(false)

  // 분석 결과가 없으면 업로드 페이지로 리다이렉트 (localStorage 확인 후)
  useEffect(() => {
    // localStorage에서 분석 결과를 확인하고 약간의 지연을 둠
    const timer = setTimeout(() => {
      if (!analysisResult?.risk_probability) {
        navigate('/upload')
      }
    }, 100) // 100ms 지연으로 localStorage 복원 대기

    return () => clearTimeout(timer)
  }, [analysisResult, navigate])

  // 분석 결과에서 점수 계산 (위험도를 점수로 변환)
  const analysisScore = analysisResult ? Math.round(100 - parseFloat(analysisResult.risk_probability.replace('%', ''))) : 0

  const handleShowContent = () => {
    // 컨텐츠 표시
    setShowContent(true)

    // 컨텐츠가 DOM에 렌더링된 후 스크롤 실행
    setTimeout(() => {
      if (detailSectionRef.current) {
        const elementTop = detailSectionRef.current.offsetTop
        const offset = 20
        const targetScrollTop = elementTop - offset

        // 부드러운 스크롤로 ResultContent 영역으로 이동
        window.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        })

        // 대안으로 scrollIntoView도 함께 사용하여 안정성 확보
        setTimeout(() => {
          detailSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          })
        }, 100)
      }
    }, 150)
  }

  return (
    <div
      ref={containerRef}
      className='min-h-screen w-full bg-white overflow-x-hidden container p-6 mx-auto'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 헤더 */}
        <div className='text-2xl md:text-3xl font-semibold text-mainfont text-center mt-20 mb-[35%]'>
          <h1 className=''>부동산 검토 결과입니다</h1>
          <p className='text-lg text-gray-600'>분석이 완료되었어요</p>
        </div>

        {/* 점수 섹션 */}
        <ScoreProgress
          score={analysisScore}
          size={240}
          strokeWidth={14}
          animationDuration={2.5}
          className='mb-[45%]'
        />

        <div
          ref={scrollIconRef}
          className={`flex flex-col text-center items-center cursor-pointer mb-[10%] transition-all duration-300 ${showContent ? 'opacity-50 pointer-events-none' : 'hover:scale-105'}`}
          onClick={handleShowContent}
        >
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
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <ResultContent />

            <div className='mt-8 pt-6 border-t border-gray-200'>
              <p className='text-center text-gray-600 mb-6'>관심있는 부동산의 추가적인 정보가 필요하다면</p>
            </div>
          </motion.div>
        )}

        {/* 액션 버튼 - 처음에는 완전히 숨김 */}
        {showContent && (
          <motion.div
            className='mt-6 space-y-3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <button
              onClick={() => navigate('/')}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 text-lg'
            >
              전문가 매칭 받기
            </button>

            <button
              onClick={() => {
                clear()
                navigate('/upload')
              }}
              className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-xl transition-all duration-200'
            >
              다른 등기부등본 분석하기
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
