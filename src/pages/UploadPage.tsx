import { useNavigate } from 'react-router-dom'
import { useDeedUploadStore } from '../store/useDeedUploadStore'
import { usePageStepStore } from '../store/usePageStepStore'
import { useUploadDeed } from '../hooks/useUploadDeed'
import PdfDropbox from '../components/PdfDropbox'
import PageStepbar from '../components/PageStepbar'

export default function UploadPage() {
  const navigate = useNavigate()
  const { file, error } = useDeedUploadStore()
  const { currentStep, totalSteps, nextStep } = usePageStepStore()
  const uploadMutation = useUploadDeed()

  const isValid = file && !error
  const isUploading = uploadMutation.isPending

  const handleProceed = async () => {
    if (!file || isUploading) return

    try {
      const result = await uploadMutation.mutateAsync(file)
      // Navigate to result page with uploadId
      navigate('/result', { state: { uploadId: result.uploadId } })
    } catch {
      // Error is handled by the mutation hook
    }
  }

  // 테스트용 핸들러
  const handleTestProceed = () => {
    nextStep() // 스텝 증가
    navigate('/addInfo') // AddInfoPage로 이동
  }

  return (
    <div className='container max-w mx-auto  h-screen flex flex-col'>
      {/* 상단 콘텐츠 영역 (80%) */}
      <div className='flex-[8] flex flex-col px-4 bg-amber-100'>
        {/* Title */}
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900 tracking-tight text-center mb-8'>등기부등본을 첨부해주세요!</h1>

        {/* PdfDropbox */}
        <div className='mb-4'>
          <PdfDropbox
            maxSizeMb={20}
            isUploading={isUploading}
          />
        </div>

        {/* Microcopy */}
        <div
          id='upload-help'
          className='mb-8 space-y-1'
        >
          <p className='text-xs text-red-500 leading-tight text-center'>* 말소사항 포함으로 발급받으면 더욱 정확한 분석이 가능합니다</p>
          <p className='text-xs text-red-500 leading-tight text-center'>* 업로드된 파일은 24시간 내 자동 삭제됩니다.</p>
        </div>

        {/* Step Indicator */}
      </div>

      {/* 하단 버튼 영역 (20%) */}
      <div className='flex-[2] flex flex-col px-4 bg-sky-100'>
        {/* CTA Button */}
        <div>
          <PageStepbar
            totalSteps={totalSteps}
            currentStep={currentStep}
          />
        </div>
        <div className='space-y-3'>
          {/* 원래 버튼 */}
          <button
            onClick={handleProceed}
            disabled={!isValid || isUploading}
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            {isUploading ? '업로드 중...' : '위험도 체크하러 가기'}
          </button>

          {/* 테스트용 버튼 */}
          <button
            onClick={handleTestProceed}
            className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
          >
            테스트 버튼
          </button>
        </div>

        {/* Upload Error */}
        {uploadMutation.error && (
          <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
            <p
              className='text-sm text-red-700'
              role='alert'
              aria-live='polite'
            >
              {uploadMutation.error instanceof Error ? uploadMutation.error.message : '업로드 중 오류가 발생했습니다. 다시 시도해주세요.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
