import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'
import Button from '../components/Button'
import AnalysisResultCard from '../components/AnalysisResultCard'

import LogoDouble from '../assets/LogoDouble.png'

export default function MyPage() {
  const navigate = useNavigate()
  const { logout, user, token, setUser } = useAuthStore()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleProceed = async () => {
    try {
      navigate('/upload')
    } catch {
      navigate('/error')
    }
  }
  // GET /api/user/profile

  // response
  //   {
  //   "nickname": "최진형",
  //   "profileImage": "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg"
  // }
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://port-0-knock-be-mfwjoh9272fc7aba.sel3.cloudtype.app/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        // API 응답 데이터를 AuthStore에 저장
        const profileData = {
          id: user?.id || '', // 기존 id 유지
          nickname: response.data.nickname,
          profileImage: response.data.profileImage,
        }

        setUser(profileData)
        console.log('사용자 프로필 데이터:', response.data)
      } catch (error) {
        console.error('사용자 프로필 조회 오류:', error)
        // 오류 시 로그아웃 처리
        logout()
        navigate('/login')
      }
    }

    if (token) {
      fetchUserProfile()
    }
  }, [logout, navigate, token, setUser, user?.id])

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      const response = await axios.post(
        'https://port-0-knock-be-mfwjoh9272fc7aba.sel3.cloudtype.app/api/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('로그아웃 API 응답:', response.data.message)
      logout()
      navigate('/login')
    } catch (error) {
      console.error('로그아웃 API 오류:', error)
      logout()
      navigate('/login')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className='container h-screen flex flex-col p-6 relative'>
      {/* 기존 9:1 비율 유지하되 내부에서 프로필 고정 + 목록 스크롤 */}
      <div className='flex-[9] flex flex-col'>
        {/* 상단 고정 프로필 영역 */}
        <div className='flex-shrink-0 flex flex-col items-center pt-4 pb-6'>
          {/* 유저 이미지 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <div className='w-35 h-35 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center overflow-hidden'>
              <img
                src={user?.profileImage || LogoDouble}
                alt='User'
                className='w-full h-full object-cover rounded-full'
              />
            </div>
          </motion.div>

          {/* 유저 이름 */}
          <motion.div
            className='text-center mb-4'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}>
            <h2 className='text-3xl font-semibold mb-3'>{user?.nickname || '고구마'}</h2>

            {/* 로그아웃 버튼 */}
            <motion.button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`text-sm px-3 py-1 rounded-md border transition-colors cursor-pointer ${isLoggingOut ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 border-gray-300 hover:border-gray-400'}`}
              whileHover={!isLoggingOut ? { scale: 1.02 } : {}}
              whileTap={!isLoggingOut ? { scale: 0.98 } : {}}>
              {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
            </motion.button>
          </motion.div>
        </div>

        {/* 스크롤 가능한 목록 영역 */}
        <div className='flex-1 overflow-y-auto'>
          <motion.div
            className='w-full'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}>
            <h3 className='text-lg font-semibold text-center text-gray-800 mb-4'>분석 리포트</h3>

            {/* 컴포넌트화된 등기부등본 조회 결과 카드들 */}
            <AnalysisResultCard
              address='경기도 용인시 기흥구 구갈동 384-1 동부아파트 제103동 제7층 제707호'
              riskLevel='안전'
              analysisDate='2024.12.20 분석완료'
              summary='전세가율 70%, 근저당권 1개, 선순위 채권 없음. 안전한 거래 가능한 매물입니다.'
              onViewDetails={() => console.log('강남구 역삼동 상세 결과 보기')}
            />
          </motion.div>
        </div>
      </div>

      {/* 기존 1 비율 유지 - 하단 버튼 */}
      <motion.div
        className='flex-[1] flex flex-col'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}>
        <Button
          onClick={handleProceed}
          variant='primary'>
          등기부등본 분석하러 가기
        </Button>
      </motion.div>
    </div>
  )
}
