import { useMutation } from '@tanstack/react-query'
import { useDeedUploadStore } from '../store/useDeedUploadStore'

interface UploadResponse {
  uploadId: string
}

const uploadDeed = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('업로드에 실패했습니다. 다시 시도해주세요.')
  }

  return response.json()
}

export const useUploadDeed = () => {
  const { setProgress, setUploadId, setError } = useDeedUploadStore()

  return useMutation({
    mutationFn: uploadDeed,
    onMutate: () => {
      setError(null)
      setProgress(0)
    },
    onSuccess: (data) => {
      setUploadId(data.uploadId)
      setProgress(100)
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : '업로드 중 오류가 발생했습니다.')
      setProgress(0)
    },
    onSettled: () => {
      // Reset progress after completion
      setTimeout(() => setProgress(0), 1000)
    },
  })
}
