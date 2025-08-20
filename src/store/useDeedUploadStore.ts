import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AnalysisResult {
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

interface DeedUploadState {
  file: File | null
  error: string | null
  progress: number
  analysisResult: AnalysisResult | null
  isAnalyzing: boolean
}

interface DeedUploadActions {
  setFile: (file: File | null) => void
  clear: () => void
  setError: (msg: string | null) => void
  setProgress: (progress: number) => void
  setAnalysisResult: (result: AnalysisResult | null) => void
  setIsAnalyzing: (isAnalyzing: boolean) => void
}

type DeedUploadStore = DeedUploadState & DeedUploadActions

export const useDeedUploadStore = create<DeedUploadStore>()(
  persist(
    (set) => ({
      // State
      file: null,
      error: null,
      progress: 0,
      analysisResult: null,
      isAnalyzing: false,

      // Actions
      setFile: (file) => set({ file, error: null }),
      clear: () => {
        set({
          file: null,
          error: null,
          progress: 0,
          analysisResult: null,
          isAnalyzing: false,
        })
        // localStorage에서도 완전히 제거
        localStorage.removeItem('deed-upload-storage')
      },
      setError: (error) => set({ error }),
      setProgress: (progress) => set({ progress }),
      setAnalysisResult: (analysisResult) => set({ analysisResult }),
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
    }),
    {
      name: 'deed-upload-storage', // localStorage key
      partialize: (state) => ({
        analysisResult: state.analysisResult,
      }), // 분석 결과만 저장
    }
  )
)
