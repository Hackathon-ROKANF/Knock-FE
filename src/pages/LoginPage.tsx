import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import LogoDouble from '../assets/LogoDouble.png'
import kakao_login_medium_wide from '../assets/kakao_login_medium_wide.png'
import axios from 'axios'

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { token, isAuthenticated } = useAuthStore()

  // 이미 로그인된 경우 바로 upload 페이지로 이동
  useEffect(() => {
    if (token && isAuthenticated) {
      console.log('이미 로그인된 상태입니다. upload 페이지로 이동합니다.')
      navigate('/upload')
      return
    }

    // URL 파라미터에서 에러 확인
    const urlParams = new URLSearchParams(window.location.search)
    const error = urlParams.get('error')

    if (error === 'login_failed') {
      setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.')
    }
  }, [token, isAuthenticated, navigate])

  const kakaoLogin = () => {
    axios
      .get('https://port-0-knock-be-mfwjoh9272fc7aba.sel3.cloudtype.app/api/auth/kakao/login')
      .then((response) => {
        // 백엔드에서 받은 URL로 리다이렉트
        window.location.href = response.data.loginUrl
      })
      .catch(() => {
        setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.')
        setIsLoading(false)
      })
  }

  return (
    <div className='container h-screen flex flex-col p-6 relative'>
      {/* 에러 메시지 */}
      {errorMessage && (
        <motion.div
          className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}>
          <p className='text-red-600 text-sm text-center'>{errorMessage}</p>
        </motion.div>
      )}

      {/* 로고 - 화면 중앙 */}
      <motion.div
        className='flex-1 flex items-center justify-center'
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

      {/* 카카오 로그인 버튼 */}
      <motion.div
        className='flex-shrink-0 mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.7,
          ease: 'easeOut',
        }}>
        <motion.img
          src={kakao_login_medium_wide}
          alt='Kakao Login Button'
          className={`mx-auto block ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          onClick={() => {
            setIsLoading(true)
            kakaoLogin()
          }}
        />
      </motion.div>
    </div>
  )
}
