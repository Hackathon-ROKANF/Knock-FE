import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useDeedUploadStore } from '../store/useDeedUploadStore'

interface AnalysisResponse {
  all_features: {
    건축물_유형: string
    과거_매매가: string
    과거_전세가: string
    과거_전세가율: string
    근저당권_개수: string
    근저당권_설정일_최근: string
    매매가: string
    선순위_채권_존재여부: string
    신탁_등기여부: string
    압류_가압류_개수: string
    우선변제권_여부: string
    전세가: string
    전세가율: string
    전입_가능여부: string
    주소: string
    채권최고액: string
  }
  analysis_summary: string
  prediction: '안전' | '관심' | '주의' | '위험'
  risk_probability: string
  risk_score: string
}

const analyzeDeed = async (file: File, onProgress?: (progress: number) => void): Promise<AnalysisResponse> => {
  console.log('🚀 API 요청 시작:', {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
  })

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post('https://port-0-knockai-mcmt59q6ef387a77.sel5.cloudtype.app/api/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log('📤 업로드 진행률:', percentCompleted + '%')
          onProgress(percentCompleted)
        }
      },
    })

    console.log('✅ API 응답 성공:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    })

    return response.data
  } catch (error) {
    console.error('❌ API 요청 실패:', error)
    if (axios.isAxiosError(error)) {
      console.error('📋 에러 세부사항:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      })
    }
    throw error
  }
}

export const useUploadDeed = () => {
  const { setProgress, setError, setAnalysisResult, setIsAnalyzing } = useDeedUploadStore()

  return useMutation({
    mutationFn: (file: File) => analyzeDeed(file, setProgress),
    onMutate: () => {
      console.log('🔄 Mutation 시작')
      setError(null)
      setProgress(0)
      setIsAnalyzing(true)
      setAnalysisResult(null)
    },
    onSuccess: (data: AnalysisResponse) => {
      console.log('🎉 Mutation 성공 - 분석 결과:', {
        prediction: data.prediction,
        risk_probability: data.risk_probability,
        features_count: Object.keys(data.all_features).length,
        summary_length: data.analysis_summary.length,
        full_data: data,
      })
      setProgress(100)
      setAnalysisResult(data)
      setIsAnalyzing(false)
    },
    onError: (error) => {
      console.error('💥 Mutation 에러:', error)

      let errorMessage = '분석 중 오류가 발생했습니다.'

      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status
        if (status === 400) {
          errorMessage = '올바른 등기부등본 PDF 파일을 업로드 해주세요.'
        } else if (status === 413) {
          errorMessage = '10MB 이하의 파일을 업로드해주세요.'
        } else if (status >= 500) {
          errorMessage = '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
        } else {
          errorMessage = error.message || '분석 중 오류가 발생했습니다.'
        }
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      console.error('📝 에러 메시지:', errorMessage)
      setError(errorMessage)
      setProgress(0)
      setIsAnalyzing(false)
    },
    onSettled: () => {
      console.log('🏁 Mutation 완료')
      // Reset progress after completion
      setTimeout(() => setProgress(0), 1000)
    },
  })
}
