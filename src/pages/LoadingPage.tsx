import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDeedUploadStore } from '../store/useDeedUploadStore'

const LOADING_MESSAGES = [
  'PDF 파일을 분석하는 중이에요',
  '표제부 정보를 확인하고 있어요',
  '갑구 소유권 변동사항을 검토중이에요',
  '을구 권리사항을 분석하고 있어요',
  '채권 및 담보권 정보를 확인중이에요',
  '임차권 등기명령을 검토하고 있어요',
  '압류/가압류 내역을 분석중이에요',
  '위험도를 종합 평가하고 있어요',
]

const MINIMUM_LOADING_TIME = 10000 // 10초

export default function LoadingPage() {
  const navigate = useNavigate()
  const { isAnalyzing, analysisResult, error } = useDeedUploadStore()
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [canNavigate, setCanNavigate] = useState(false)
  const [hasStartedAnalysis, setHasStartedAnalysis] = useState(false)

  // 분석 시작 감지
  useEffect(() => {
    if (isAnalyzing) {
      setHasStartedAnalysis(true)
    }
  }, [isAnalyzing])

  // 메시지 순환 효과 - 1초 지연 후 시작
  useEffect(() => {
    const startDelay = setTimeout(() => {
      const messageInterval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
      }, 1500) // 1.5초마다 메시지 변경

      return () => clearInterval(messageInterval)
    }, 1000) // 1초 후 시작

    return () => clearTimeout(startDelay)
  }, [])

  // 최소 로딩 시간 체크
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanNavigate(true)
    }, MINIMUM_LOADING_TIME)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // 분석이 시작되었고, 완료되었으며, 결과가 있고, 최소 로딩 시간이 경과한 경우에만 결과 페이지로 이동
    if (hasStartedAnalysis && !isAnalyzing && analysisResult && canNavigate) {
      navigate('/result')
    }

    // 에러가 발생했으면 업로드 페이지로 돌아가기
    if (error) {
      navigate('/upload')
    }
  }, [hasStartedAnalysis, isAnalyzing, analysisResult, error, canNavigate, navigate])

  return (
    <div className='container h-screen flex flex-col p-6'>
      {/* 로딩 메시지 */}
      <motion.div
        className='text-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className='text-2xl md:text-3xl font-semibold text-mainfont text-left mt-20 mb-[35%]'>
          분석중이에요 <br /> 잠시만 기다려주세요
        </h1>
      </motion.div>

      {/* Lottie 애니메이션 - 반응형 및 가운데 정렬 */}
      <motion.div
        className='w-[full] flex flex-col items-center justify-center'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className='flex items-center justify-center'>
          <iframe
            className='min-w-full min-h-[250px]'
            src='https://lottie.host/embed/d1ee3cb3-1971-4ce7-acc5-c7057340eb49/Zr6vqXeKkm.lottie'
            title='Loading Animation'
          />
        </div>

        <motion.div
          className='text-center flex flex-col items-center p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className='max-w-sm w-full'>
            {/* 동적 분석 단계 메시지 */}
            <AnimatePresence mode='wait'>
              <motion.p
                key={currentMessageIndex}
                className='text-sm text-mainfont'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {LOADING_MESSAGES[currentMessageIndex]}
              </motion.p>
            </AnimatePresence>

            {/* 분석 완료 후 대기 중일 때 */}
            {hasStartedAnalysis && !isAnalyzing && analysisResult && !canNavigate && (
              <motion.p
                className='text-xs text-blue-600 mt-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                분석 완료! 분석 결과를 보기좋게 정리 중이에요
              </motion.p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
