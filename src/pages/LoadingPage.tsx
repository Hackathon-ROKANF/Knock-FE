import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LoadingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // 5초 후에 결과 페이지로 이동
    const timer = setTimeout(() => {
      navigate('/result')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

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
          className='mt-8 text-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className='bg-gray-100 rounded-lg p-3 max-w-sm mx-auto'>
            <p className='text-sm text-mainfont'>등기부등본을 꼼꼼히 분석하고 있어요</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
