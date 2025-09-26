import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import ConfirmModal from '../components/ConfirmModal'
import QuestionButton from '../components/ResultQuestionButton'
import InfoBox from '../components/InfoBox'

// 상세 분석 결과 타입 정의
interface DetailAnalysisResult {
  id: number
  prediction: '안전' | '관심' | '주의' | '위험'
  risk_score: number
  risk_probability: string
  summary_json: string
  features_json: string
  file_path: string
  created_at: string
  user_id: string
}

// 파싱된 summary와 features 타입
interface ParsedSummary {
  안전?: string
  위험_요인: string[]
  안전_요인: string[]
}

interface ParsedFeatures {
  건축물_유형: string
  근저당권_개수: string
  채권최고액: string
  근저당권_설정일_최근: string
  신탁_등기여부: string
  압류_가압류_개수: string
  선순위_채권_존재여부: string
  전입_가능여부: string
  우선변제권_여부: string
  주소: string
  전세가: string | null
  매매가: string | null
  전세가율: string | null
  과거_매매가: string
  과거_전세가: string | null
  과거_전세가율: string | null
}

export default function MyResultPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { token } = useAuthStore()

  const [analysisDetail, setAnalysisDetail] = useState<DetailAnalysisResult | null>(null)
  const [parsedSummary, setParsedSummary] = useState<ParsedSummary | null>(null)
  const [parsedFeatures, setParsedFeatures] = useState<ParsedFeatures | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  // 상세 분석 결과 가져오기
  useEffect(() => {
    const fetchAnalysisDetail = async () => {
      if (!id || !token) {
        navigate('/mypage')
        return
      }

      setIsLoading(true)
      try {
        const response = await axios.post(
          'https://port-0-knock-be-mfwjoh9272fc7aba.sel3.cloudtype.app/api/analysis/detail',
          { id: parseInt(id) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        const data = response.data
        setAnalysisDetail(data)

        // JSON 문자열 파싱
        try {
          const summary = JSON.parse(data.summary_json)
          const features = JSON.parse(data.features_json)
          setParsedSummary(summary)
          setParsedFeatures(features)
        } catch (parseError) {
          console.error('JSON 파싱 오류:', parseError)
        }

        console.log('상세 분석 결과:', data)
      } catch (error) {
        console.error('상세 분석 결과 조회 오류:', error)
        navigate('/mypage')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalysisDetail()
  }, [id, token, navigate])

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
  }

  // 위험확률을 점수로 변환
  const calculateScore = (riskProbability: string) => {
    const riskPercentage = parseFloat(riskProbability.replace('%', ''))
    return Math.round(100 - riskPercentage)
  }

  if (isLoading) {
    return (
      <div className='container h-screen flex items-center justify-center'>
        <p className='text-gray-500'>분석 결과를 불러오는 중...</p>
      </div>
    )
  }

  if (!analysisDetail) {
    return (
      <div className='container h-screen flex items-center justify-center'>
        <p className='text-gray-500'>분석 결과를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className='container h-screen no-scrollbar bg-white overflow-x-hidden p-6 overflow-auto relative'>
      {/* 뒤로가기 버튼 */}
      <div className='absolute top-4 left-4 z-10'>
        <BackButton to='/mypage' />
      </div>

      {/* 질문 버튼 */}
      <div className='absolute top-4 right-4 z-10'>
        <QuestionButton />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        {/* 헤더 */}
        <PageHeader
          title={`상세 분석 결과`}
          subtitle={formatDate(analysisDetail.created_at)}
        />

        {/* 주소 정보 */}
        <motion.div
          className='mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <h3 className='text-sm text-gray-600 mb-1'>분석 대상</h3>
          <p className='text-base font-medium text-gray-900'>{parsedFeatures?.주소 || '주소 정보 없음'}</p>
        </motion.div>

        {/* 위험도 요약 */}
        <motion.div
          className='mb-6'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}>
          <div
            className={`p-4 rounded-lg ${
              analysisDetail.prediction === '안전'
                ? 'bg-green-50 border border-green-200'
                : analysisDetail.prediction === '관심'
                ? 'bg-blue-50 border border-blue-200'
                : analysisDetail.prediction === '주의'
                ? 'bg-yellow-50 border border-yellow-200'
                : 'bg-red-50 border border-red-200'
            }`}>
            <div className='flex flex-col mb-3'>
              <div className='flex items-center mb-2'>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    analysisDetail.prediction === '안전'
                      ? 'bg-green-100 text-green-700'
                      : analysisDetail.prediction === '관심'
                      ? 'bg-blue-100 text-blue-700'
                      : analysisDetail.prediction === '주의'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                  {analysisDetail.prediction}
                </span>
                <span className='ml-2 text-sm text-gray-600'>분석 ID: #{analysisDetail.id}</span>
              </div>
              <div className='flex items-center gap-4 text-sm text-gray-600'>
                <span>점수: {calculateScore(analysisDetail.risk_probability)}점</span>
              </div>
            </div>
            {parsedSummary?.안전 && <p className='text-sm text-gray-700 leading-relaxed'>{parsedSummary.안전}</p>}
          </div>
        </motion.div>

        {/* 기본 정보 표시 */}
        <motion.div
          className='mb-8 grid grid-cols-2 gap-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}>
          {parsedFeatures && (
            <>
              <InfoBox
                label='건물 유형'
                value={parsedFeatures.건축물_유형}
              />

              <InfoBox
                label='근저당권 개수'
                value={`${parsedFeatures.근저당권_개수}개`}
              />

              <InfoBox
                label='채권최고액'
                value={parsedFeatures.채권최고액 && parsedFeatures.채권최고액 !== '0' ? `${parseInt(parsedFeatures.채권최고액).toLocaleString()}원` : '0원'}
              />

              <InfoBox
                label='근저당권 설정일'
                value={parsedFeatures.근저당권_설정일_최근 && parsedFeatures.근저당권_설정일_최근 !== 'None' ? parsedFeatures.근저당권_설정일_최근 : '설정 없음'}
              />

              <InfoBox
                label='신탁 등기 여부'
                value={parsedFeatures.신탁_등기여부 === 'True' ? '있음' : '없음'}
              />

              <InfoBox
                label='압류/가압류 개수'
                value={`${parsedFeatures.압류_가압류_개수}개`}
              />

              <InfoBox
                label='선순위 채권 존재'
                value={parsedFeatures.선순위_채권_존재여부 === 'True' ? '있음' : '없음'}
              />

              <InfoBox
                label='전입 가능 여부'
                value={parsedFeatures.전입_가능여부 === 'True' ? '가능' : '불가능'}
              />

              <InfoBox
                label='우선변제권'
                value={parsedFeatures.우선변제권_여부 === 'True' ? '있음' : '없음'}
              />

              {/* 현재 가격 정보 - 조건부 렌더링 */}
              {parsedFeatures.전세가 && parsedFeatures.전세가 !== 'None' && (
                <InfoBox
                  label='현재 전세가'
                  value={`${parseInt(parsedFeatures.전세가).toLocaleString()}원`}
                  variant='current'
                />
              )}

              {parsedFeatures.매매가 && parsedFeatures.매매가 !== 'None' && (
                <InfoBox
                  label='현재 매매가'
                  value={`${parseInt(parsedFeatures.매매가).toLocaleString()}원`}
                  variant='current'
                />
              )}

              {parsedFeatures.전세가율 && parsedFeatures.전세가율 !== 'None' && (
                <InfoBox
                  label='현재 전세가율'
                  value={`${parsedFeatures.전세가율}%`}
                  variant='current'
                />
              )}

              {/* 과거 가격 정보 - 조건부 렌더링 */}
              {parsedFeatures.과거_매매가 && parsedFeatures.과거_매매가 !== 'None' && (
                <InfoBox
                  label='과거 매매가'
                  value={`${parseInt(parsedFeatures.과거_매매가).toLocaleString()}원`}
                  variant='past'
                  colSpan={true}
                />
              )}

              {parsedFeatures.과거_전세가 && parsedFeatures.과거_전세가 !== 'None' && (
                <InfoBox
                  label='과거 전세가'
                  value={`${parseInt(parsedFeatures.과거_전세가).toLocaleString()}원`}
                  variant='past'
                />
              )}

              {parsedFeatures.과거_전세가율 && parsedFeatures.과거_전세가율 !== 'None' && (
                <InfoBox
                  label='과거 전세가율'
                  value={`${parsedFeatures.과거_전세가율}%`}
                  variant='past'
                />
              )}
            </>
          )}
        </motion.div>

        {/* 안전 요인 */}
        {parsedSummary?.안전_요인 && parsedSummary.안전_요인.length > 0 && (
          <motion.div
            className='mb-6'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}>
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>✅ 안전 요인</h3>
            <div className='space-y-2'>
              {parsedSummary.안전_요인.map((factor, index) => (
                <div
                  key={index}
                  className='flex items-start'>
                  <span className='w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0'></span>
                  <p className='text-sm text-gray-700 leading-relaxed'>{factor}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 위험 요인 */}
        {parsedSummary?.위험_요인 && parsedSummary.위험_요인.length > 0 && (
          <motion.div
            className='mb-8'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}>
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>⚠️ 위험 요인</h3>
            <div className='space-y-2'>
              {parsedSummary.위험_요인.map((factor, index) => (
                <div
                  key={index}
                  className='flex items-start'>
                  <span className='w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0'></span>
                  <p className='text-sm text-gray-700 leading-relaxed'>{factor}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 전문가 상담 안내 */}
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <p className='text-center text-gray-600 mb-6'>전문가와 상담하면 더 정확한 분석이 가능해요</p>
        </div>

        {/* 액션 버튼들 */}
        <motion.div
          className='space-y-3 pb-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}>
          <Button
            onClick={() => navigate('/expert')}
            variant='primary'>
            전문가와 상담하기
          </Button>

          <Button
            onClick={() => {
              setConfirmText('다른 등기부등본을 분석할까요?')
              setShowConfirmModal(true)
            }}
            variant='secondary'>
            다른 등기부등본 분석하기
          </Button>

          <Button
            onClick={() => navigate('/mypage')}
            variant='secondary'>
            내 분석 목록으로 돌아가기
          </Button>
        </motion.div>
      </motion.div>

      {/* 확인 모달 */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          navigate('/upload')
        }}
        title={confirmText}
        message='새로운 분석을 시작해요'
      />
    </div>
  )
}
