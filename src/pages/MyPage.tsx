import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'
import Button from '../components/Button'
import AnalysisResultCard from '../components/AnalysisResultCard'

// 분석 결과 타입 정의
interface AnalysisResult {
  id: number
  createdAt: string
  userId: number
  address: string
  prediction: '안전' | '관심' | '주의' | '위험'
}

export default function MyPage() {
  const navigate = useNavigate()
  const { logout, user, token, setUser } = useAuthStore()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [isLoadingResults, setIsLoadingResults] = useState(false)

  const handleProceed = async () => {
    try {
      navigate('/upload')
    } catch {
      navigate('/error')
    }
  }

  // POST /api/analysis/recent
  const fetchAnalysisResults = useCallback(async () => {
    setIsLoadingResults(true)
    try {
      const response = await axios.post(
        'https://port-0-knock-be-mfwjoh9272fc7aba.sel3.cloudtype.app/api/analysis/recent',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // API 응답이 배열인지 확인하고 설정
      const results = Array.isArray(response.data) ? response.data : []
      setAnalysisResults(results)
      // console.log('분석 결과 데이터:', response.data)
    } catch (error) {
      // console.error('분석 결과 조회 오류:', error)
      // 오류 발생 시 빈 배열로 설정
      setAnalysisResults([])
    } finally {
      setIsLoadingResults(false)
    }
  }, [token])

  // GET /api/user/profile
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
        // console.log('사용자 프로필 데이터:', response.data)
      } catch (error) {
        // console.error('사용자 프로필 조회 오류:', error)
        // 오류 시 로그아웃 처리
        logout()
        navigate('/login')
      }
    }

    if (token) {
      fetchUserProfile()
      fetchAnalysisResults()
    }
  }, [logout, navigate, token, setUser, user?.id, fetchAnalysisResults])

  // POST /api/auth/logout
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

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} 분석완료`
  }

  return (
    <div className='container h-screen flex flex-col p-6 relative'>
      <div className='flex-[9] flex flex-col min-h-0'>
        <div className='flex-shrink-0 flex flex-col items-center mt-10 md:mt-20'>
          {/* 유저 이미지 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <div className='w-35 h-35 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center overflow-hidden'>
              <img
                src={user?.profileImage}
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
        <div className='flex-1 overflow-y-auto min-h-0 no-scrollbar'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}>
            <h3 className='text-xl font-semibold text-left text-gray-800 ml-2 mb-2'>분석 리포트</h3>

            {/* 로딩 상태 */}
            {isLoadingResults && (
              <div className='text-center py-8'>
                <p className='text-gray-500'>분석 결과를 불러오는 중...</p>
              </div>
            )}

            {/* 분석 결과가 없는 경우 */}
            {!isLoadingResults && (!analysisResults || analysisResults.length === 0) && (
              <div className='text-center py-8'>
                <p className='text-gray-500'>아직 분석한 부동산 등기부등본이 없어요.</p>
                <p className='text-sm text-gray-400 mt-2'>등기부등본을 분석해보세요!</p>
              </div>
            )}

            {/* 실제 API 데이터로 카드 렌더링 */}
            {!isLoadingResults &&
              analysisResults &&
              analysisResults.length > 0 &&
              analysisResults.map((result) => (
                <AnalysisResultCard
                  key={result.id}
                  address={result.address}
                  riskLevel={result.prediction}
                  analysisDate={formatDate(result.createdAt)}
                  onViewDetails={() => navigate(`/myresult/${result.id}`)}
                />
              ))}
          </motion.div>
        </div>
      </div>

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
