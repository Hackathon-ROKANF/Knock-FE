import { useDeedUploadStore } from '../store/useDeedUploadStore'
import { useUploadDeed } from '../hooks/useUploadDeed'
import DropzoneCard from '../components/PdfDropbox'
import StepDots from '../components/PageStepbar'

interface DeedUploadScreenProps {
  onProceed: (uploadId: string) => void
  onSkip?: () => void
  maxSizeMb?: number
}

export default function DeedUploadScreen({ onProceed, onSkip, maxSizeMb = 20 }: DeedUploadScreenProps) {
  const { file, error } = useDeedUploadStore()
  const uploadMutation = useUploadDeed()

  const isValid = file && !error
  const isUploading = uploadMutation.isPending

  const handleProceed = async () => {
    if (!file || isUploading) return

    try {
      const result = await uploadMutation.mutateAsync(file)
      onProceed(result.uploadId)
    } catch {
      // Error is handled by the mutation hook
    }
  }

  return (
    <div className='container max-w-md mx-auto px-4 py-8 md:py-12'>
      {/* Title */}
      <h1 className='text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight text-center mb-8'>등기부등본을 첨부해주세요!</h1>

      {/* Dropzone */}
      <div className='mb-4'>
        <DropzoneCard
          maxSizeMb={maxSizeMb}
          isUploading={isUploading}
        />
      </div>

      {/* Microcopy */}
      <div
        id='upload-help'
        className='mb-8 space-y-1'
      >
        <p className='text-xs text-red-500 leading-tight text-center'>❗ 필수사항 포함된 원본PDF수록 정확한 분석이 가능합니다.</p>
        <p className='text-xs text-red-500 leading-tight text-center'>❗ 업로드된 파일은 24시간 내 자동 삭제됩니다.</p>
      </div>

      {/* Step Indicator */}
      <div className='mb-8'>
        <StepDots
          totalSteps={4}
          currentStep={1}
        />
      </div>

      {/* CTA Button */}
      <div className='space-y-3'>
        <button
          onClick={handleProceed}
          disabled={!isValid || isUploading}
          className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          aria-disabled={!isValid || isUploading ? 'true' : 'false'}
        >
          {isUploading ? '업로드 중...' : '위험도 체크하러 가기'}
        </button>

        {onSkip && (
          <button
            onClick={onSkip}
            disabled={isUploading}
            className='w-full text-gray-500 hover:text-gray-700 disabled:opacity-50 py-2 text-sm transition-colors duration-200'
          >
            건너뛰기
          </button>
        )}
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
  )
}
