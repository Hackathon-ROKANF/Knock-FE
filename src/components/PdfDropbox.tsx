import { useRef, useState } from 'react'
import { useDeedUploadStore } from '../store/useDeedUploadStore'
import { formatBytes, validatePdfFile } from '../utils/format'

interface DropzoneCardProps {
  maxSizeMb?: number
  isUploading?: boolean
}

export default function DropzoneCard({ maxSizeMb = 20, isUploading = false }: DropzoneCardProps) {
  const { file, error, progress, setFile, setError } = useDeedUploadStore()
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileValidation = (selectedFile: File) => {
    const validationError = validatePdfFile(selectedFile, maxSizeMb)
    if (validationError) {
      setError(validationError)
      return false
    }
    setFile(selectedFile)
    return true
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      handleFileValidation(selectedFile)
    }
  }

  const handleClick = () => {
    if (isUploading) return
    fileInputRef.current?.click()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isUploading) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      fileInputRef.current?.click()
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    if (isUploading) return
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    if (isUploading) return

    const files = Array.from(event.dataTransfer.files)
    const pdfFiles = files.filter((f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))

    if (pdfFiles.length === 0) {
      setError('PDF 파일만 업로드 가능합니다.')
      return
    }

    handleFileValidation(pdfFiles[0])
  }

  const handlePaste = (event: React.ClipboardEvent) => {
    if (isUploading) return

    const items = Array.from(event.clipboardData.items)
    const pdfItem = items.find((item) => item.type === 'application/pdf')

    if (pdfItem) {
      const file = pdfItem.getAsFile()
      if (file) {
        handleFileValidation(file)
      }
    }
  }

  const handleReplaceFile = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (isUploading) return
    fileInputRef.current?.click()
  }

  const getDropzoneClasses = () => {
    let classes =
      'flex flex-col justify-center items-center border-2 border-dashed rounded-xl transition-all duration-200 min-h-55 min-w-9/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'

    if (isUploading) {
      classes += ' cursor-not-allowed opacity-75'
    } else if (isDragOver) {
      classes += ' ring-2 ring-cyan-400/20 bg-cyan-50 border-cyan-300'
    } else if (error) {
      classes += ' border-red-300 hover:bg-red-50'
    } else {
      classes += ' border-gray-300 hover:bg-gray-50'
    }

    return classes
  }

  return (
    <div className='flex relative justify-center items-center '>
      <div
        className={getDropzoneClasses()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onPaste={handlePaste}
        role='button'
        tabIndex={isUploading ? -1 : 0}
        aria-label='등기부등본 PDF 업로드'
        aria-describedby='upload-help'
      >
        <input
          ref={fileInputRef}
          type='file'
          accept='.pdf,application/pdf'
          onChange={handleFileSelect}
          className='hidden'
          disabled={isUploading}
          aria-describedby='upload-help'
          aria-label='PDF 파일 선택'
        />

        {file ? (
          <div className='text-center p-6'>
            <svg
              className='w-12 h-12 text-green-500 mx-auto mb-3'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
              />
            </svg>
            <p className='font-medium text-mainfont mb-1'>{file.name}</p>
            <p className='text-sm text-gray-500 mb-3'>{formatBytes(file.size)}</p>
            <button
              onClick={handleReplaceFile}
              className='text-sm text-blue-600 hover:text-blue-700 underline'
              disabled={isUploading}
            >
              변경
            </button>
          </div>
        ) : (
          <div className='text-center p-6'>
            <svg
              className='w-12 h-12 text-gray-400 mx-auto mb-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              />
            </svg>
            <p className='text-lg font-medium text-mainfont mb-2'>파일을 업로드 해주세요</p>
            <p className='text-sm text-gray-500 mb-4'>드래그하거나 클릭해주세요</p>
            <p className='text-xs text-gray-400'>PDF 파일만 업로드 가능</p>
          </div>
        )}

        {isUploading && progress > 0 && (
          <div className='absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden'>
            <div
              className={`h-full bg-blue-500 transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {error && (
        <div className='absolute -top-10 left-0 right-0 flex justify-center'>
          <p
            id='upload-error'
            role='alert'
            aria-live='polite'
            className='text-sm text-red-600 text-center bg-red-50 px-3 py-1 rounded-md'
          >
            {error}
          </p>
        </div>
      )}
    </div>
  )
}
