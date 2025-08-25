import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDeedUploadStore } from '../store/useDeedUploadStore'
import PageHeader from '../components/PageHeader'

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

export default function LoadingPage() {
  const navigate = useNavigate()
  const { isAnalyzing, analysisResult, error } = useDeedUploadStore()
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [canNavigate, setCanNavigate] = useState(false)
  const [hasStartedAnalysis, setHasStartedAnalysis] = useState(false)
  const [showCompletionMessage, setShowCompletionMessage] = useState(false)

  useEffect(() => {
    if (isAnalyzing) {
      setHasStartedAnalysis(true)
    }
  }, [isAnalyzing])

  useEffect(() => {
    const startDelay = setTimeout(() => {
      const messageInterval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
      }, 1500)

      return () => clearInterval(messageInterval)
    }, 500)

    return () => clearTimeout(startDelay)
  }, [])

  useEffect(() => {
    if (hasStartedAnalysis && !isAnalyzing && analysisResult) {
      setShowCompletionMessage(true)

      const completionTimer = setTimeout(() => {
        setCanNavigate(true)
      }, 5000)

      return () => clearTimeout(completionTimer)
    }
  }, [hasStartedAnalysis, isAnalyzing, analysisResult])

  useEffect(() => {
    if (canNavigate) {
      navigate('/result')
    }

    if (error) {
      navigate('/upload')
    }
  }, [canNavigate, error, navigate])

  return (
    <div className='container h-screen flex flex-col p-6'>
      <PageHeader
        title={'분석중이에요\n잠시만 기다려주세요'}
        textAlign='left'
        titleClassName='whitespace-pre-line'
      />

      <motion.div
        className='w-[full] flex flex-col items-center justify-center'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.0 }}>
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
          transition={{ delay: 0.3, duration: 0.6 }}>
          <div className='max-w-sm w-full'>
            <AnimatePresence mode='wait'>
              <motion.p
                key={currentMessageIndex}
                className='text-sm text-mainfont'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}>
                {LOADING_MESSAGES[currentMessageIndex]}
              </motion.p>
            </AnimatePresence>

            {showCompletionMessage && (
              <motion.p
                className='text-sm text-blue-600 mt-4 font-semibold'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}>
                분석완료! 분석 결과를 보기좋게 정리 중이에요
              </motion.p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
