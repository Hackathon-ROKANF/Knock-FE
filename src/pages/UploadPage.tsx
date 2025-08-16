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

  return (
    <div className='container h-screen flex flex-col p-5'>
      {/* 상단 콘텐츠 영역 (90%) */}
      <div className='flex-[9]'>
        {/* 테스트용 버튼 */}
        <button
          onClick={() => {
            nextStep() // 스텝 증가
            navigate('/addInfo') // AddInfoPage로 이동
          }}
          className='absolute right-6 bg-green-600 text-white font-semibold py-2 px-2 rounded-xl '
        >
          test{`->`}
        </button>

        {/* Title */}
        <h1 className='text-2xl md:text-3xl font-semibold text-mainfont text-center mt-20 mb-37.5'>등기부등본을 첨부해주세요</h1>

        {/* PdfDropbox */}
        <div className='mb-4 '>
          <PdfDropbox
            maxSizeMb={20}
            isUploading={isUploading}
          />
        </div>

        {/* Microcopy */}
        <div
          id='upload-help'
          className='space-y-2'
        >
          <p className='text-xs text-red-500 leading-tight text-center'>* 말소사항 포함으로 발급받으면 더욱 정확한 분석이 가능해요</p>
          <p className='text-xs text-red-500 leading-tight text-center'>* 업로드된 파일은 24시간 내 자동 삭제돼요</p>
        </div>
      </div>

      {/* 하단 버튼 영역 (10%) */}
      <div className='flex-[1] flex flex-col mb-11'>
        {/* CTA Button */}
        <div>
          <PageStepbar
            totalSteps={totalSteps}
            currentStep={currentStep}
          />
        </div>
        <div className='mt-12.5'>
          <button
            onClick={handleProceed}
            disabled={!isValid || isUploading}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 '
          >
            {isUploading ? '업로드 중...' : '위험도 체크하러 가기'}
          </button>
        </div>

        {/* Upload Error */}
        {/* {uploadMutation.error && (
          <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
            <p
              className='text-sm text-red-700'
              role='alert'
              aria-live='polite'
            >
              {uploadMutation.error instanceof Error ? uploadMutation.error.message : '업로드 중 오류가 발생했습니다. 다시 시도해주세요.'}
            </p>
          </div>
        )} */}
      </div>
    </div>
  )
}
