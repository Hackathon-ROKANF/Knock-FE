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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)

  // 분석 결과가 없으면 업로드 페이지로 리다이렉트
  useEffect(() => {
    if (!analysisResult) {
      navigate('/upload')
    }
  }, [analysisResult, navigate])

  // 분석 결과에서 점수 계산 (위험도를 점수로 변환)
  const analysisScore = analysisResult ? Math.round(100 - parseFloat(analysisResult.risk_probability.replace('%', ''))) : 0

  const handleShowContent = () => {
    // 컨텐츠 표시
    setShowContent(true)
    setScrollProgress(1) // 모든 컨텐츠 즉시 표시

    // 0.5초 후 상세 정보 섹션으로 스크롤
    setTimeout(() => {
      if (detailSectionRef.current) {
        detailSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 200)
  }

  return (
    <div
      ref={containerRef}
      className='min-h-screen bg-white overflow-y-auto container p-6'
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
          className='flex flex-col text-center items-center cursor-pointer mb-[10%]'
          onClick={handleShowContent}
        >
          <div>클릭하여 자세한 분석 결과를 확인하세요</div>
          <DownIcon
            size={35}
            color='#9ca3af'
            className='hover:opacity-80 transition-opacity duration-200'
          />
        </div>

        {/* 상세 정보 섹션 - 처음에는 완전히 숨김 */}
        {showContent && (
          <motion.div
            ref={detailSectionRef}
            className='mt-12'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <ResultContent scrollProgress={scrollProgress} />

            <div className='mt-8 pt-6 border-t border-gray-200'>
              <p className='text-center text-gray-600 mb-6'>관심있는 부동산의 추가적인 정보가 필요하다면</p>
            </div>
          </motion.div>
        )}

        {/* 액션 버튼 - 처음에는 완전히 숨김 */}
        {showContent && (
          <motion.div
            className='mt-6 space-y-3'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
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
