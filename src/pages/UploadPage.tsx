import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDeedUploadStore } from '../store/useDeedUploadStore'
import { useUploadDeed } from '../hooks/useUploadDeed'
import PdfDropbox from '../components/PdfDropbox'

export default function UploadPage() {
  const navigate = useNavigate()
  const { file, error, isAnalyzing } = useDeedUploadStore()
  const uploadMutation = useUploadDeed()

  const isValid = file && !error

  const handleProceed = async () => {
    if (!file || isAnalyzing) return

    // 분석 시작 전에 이전 결과 초기화
    const { clear } = useDeedUploadStore.getState()
    clear()

    try {
      // 로딩 페이지로 먼저 이동
      navigate('/loading')

      // API 분석 요청 시작 (결과 대기하지 않음)
      uploadMutation.mutate(file)
    } catch {
      // Error is handled by the mutation hook
      // 에러 발생 시 업로드 페이지에 머물러서 에러 메시지 표시
    }
  }

  return (
    <div className='container h-screen flex flex-col p-6'>
      {/* 상단 콘텐츠 영역 (90%) */}
      <div className='flex-[9]'>
        {/* Title */}
        <motion.h1
          className='text-2xl md:text-3xl font-semibold text-mainfont text-center mt-20 mb-[40%]'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          등기부등본을 첨부해주세요
        </motion.h1>

        {/* PdfDropbox */}
        <motion.div
          className='mb-5'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <PdfDropbox maxSizeMb={10} />
        </motion.div>

        {/* Microcopy */}
        <motion.div
          id='upload-help'
          className='space-y-2'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className='text-xs text-red-500 leading-tight text-center'>* 말소사항 포함으로 발급받으면 더욱 정확한 분석이 가능해요</p>
          <p className='text-xs text-red-500 leading-tight text-center'>* 업로드된 파일은 24시간 내 자동 삭제돼요</p>
        </motion.div>
      </div>

      {/* 하단 버튼 영역 (10%) */}
      <motion.div
        className='flex-[1] flex flex-col mb-11'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {/* CTA Button */}
        <div className='mt-12.5'>
          <button
            onClick={handleProceed}
            disabled={!isValid || isAnalyzing}
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            {isAnalyzing ? '분석 중...' : '다음'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
