export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export const validatePdfFile = (file: File, maxSizeMb: number = 20): string | null => {
  // Check file type
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    return 'PDF 파일만 업로드 가능합니다.'
  }

  // Check file size
  const maxSizeBytes = maxSizeMb * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return `파일 크기는 ${maxSizeMb}MB 이하여야 합니다.`
  }

  return null
}
