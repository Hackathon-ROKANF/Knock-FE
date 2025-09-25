import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export default function AuthSuccessPage() {
  const navigate = useNavigate()
  const { setToken } = useAuthStore()

  useEffect(() => {
    // URL 파라미터에서 토큰 추출
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (token) {
      // 토큰 저장하고 업로드 페이지로 이동
      setToken(token)
      navigate('/upload')
    } else {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      navigate('/login?error=login_failed')
    }
  }, [setToken, navigate])

  return (
    <div className='container h-screen flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4'></div>
        <p className='text-gray-600'>로그인 처리 중...</p>
      </div>
    </div>
  )
}
