import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../store/useAuthStore'
import LogoDouble from '../assets/LogoDouble.png'

export default function FirstPage() {
  const [showSplash, setShowSplash] = useState(true)
  const navigate = useNavigate()
  const { setToken } = useAuthStore()

  useEffect(() => {
    // URL 파라미터에서 토큰 확인 (카카오 로그인 완료 후)
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    console.log('받은 JWT 토큰:', token)

    if (token) {
      // 토큰이 있으면 저장하고 업로드 페이지로 이동
      console.log('토큰을 스토어에 저장합니다:', token)
      setToken(token)
      navigate('/upload')
      return
    }

    // 일반적인 스플래시 화면 로직
    const timer = setTimeout(() => {
      setShowSplash(false)
      setTimeout(() => {
        navigate('/login')
      }, 800)
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigate, setToken])

  return (
    <div className='min-h-screen w-full overflow-hidden '>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className='flex items-center justify-center z-50'
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0.0, 0.2, 1],
            }}>
            <motion.div
              className='flex items-center justify-center h-screen '
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: 'easeOut',
              }}>
              <motion.img
                src={LogoDouble}
                alt='Knock Logo'
                className='max-w-xs md:max-w-md lg:max-w-lg h-auto'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: 'easeOut',
                }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
