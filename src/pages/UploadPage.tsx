import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDeedUploadStore } from '../store/useDeedUploadStore'
import { useUploadDeed } from '../hooks/useUploadDeed'
import PdfDropbox from '../components/PdfDropbox'

export default function UploadPage() {
  const navigate = useNavigate()
  const { file, error } = useDeedUploadStore()
  const uploadMutation = useUploadDeed()

  const isValid = file && !error
  const isUploading = uploadMutation.isPending

  const handleProceed = async () => {
    if (!file || isUploading) return

    try {
      await uploadMutation.mutateAsync(file)
      navigate('/loading')
    } catch {
      // Error is handled by the mutation hook
    }
  }

  return (
    <div className='container h-screen flex flex-col p-6'>
      {/* 상단 콘텐츠 영역 (90%) */}
      <div className='flex-[9]'>
        {/* 테스트용 버튼 */}
        <button
          onClick={() => {
            navigate('/loading') // LoadingPage로 이동
          }}
          className='absolute right-6 bg-green-600 text-white font-semibold py-2 px-2 rounded-xl '
        >
          test{`->`}
        </button>

        {/* Title */}
        <motion.h1
          className='text-2xl md:text-3xl font-semibold text-mainfont text-center mt-20 mb-[35%]'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          등기부등본을 첨부해주세요
        </motion.h1>

        {/* PdfDropbox */}
        <motion.div
          className='mb-4'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <PdfDropbox
            maxSizeMb={20}
            isUploading={isUploading}
          />
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
            disabled={!isValid || isUploading}
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            {isUploading ? '업로드 중...' : '다음'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
