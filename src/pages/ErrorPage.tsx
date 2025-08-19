import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import PageHeader from '../components/PageHeader'
import Button from '../components/Button'

export default function ErrorPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const getErrorDetails = () => {
    return {
      title: '페이지를 찾을 수 없어요',
      subtitle: '요청하신 페이지가 존재하지 않아요',
      emoji: '🔍',
    }
  }

  const errorDetails = getErrorDetails()

  return (
    <div className='container h-screen flex flex-col justify-center items-center p-6'>
      <motion.div
        className='text-center max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 에러 아이콘 */}
        <motion.div
          className='text-6xl mb-6'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {errorDetails.emoji}
        </motion.div>

        {/* 페이지 헤더 */}
        <PageHeader
          title={errorDetails.title}
          subtitle={errorDetails.subtitle}
          className='text-xl md:text-2xl font-semibold text-mainfont text-center mt-0 mb-8'
        />

        {/* 에러 코드 및 경로 정보 */}
        <motion.div
          className='bg-gray-50 rounded-lg p-4 mb-8 text-sm text-gray-600'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>ErrorCode: 404</p>
          {location.pathname !== '/' && <p>요청 경로: {location.pathname}</p>}
        </motion.div>

        {/* 액션 버튼들 */}
        <motion.div
          className='space-y-3'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={handleGoHome}
            variant='primary'
          >
            홈으로 이동
          </Button>

          <Button
            onClick={handleGoBack}
            variant='secondary'
          >
            이전 페이지로
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
