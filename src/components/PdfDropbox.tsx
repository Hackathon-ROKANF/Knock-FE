import { useRef, useState } from 'react'
import { useDeedUploadStore } from '../store/useDeedUploadStore'
import { formatBytes, validatePdfFile } from '../utils/format'
import { UploadIcon, CheckIcon } from './icons'

interface DropzoneCardProps {
  maxSizeMb?: number
}

export default function DropzoneCard({ maxSizeMb = 20 }: DropzoneCardProps) {
  const { file, error, isAnalyzing, setFile, setError } = useDeedUploadStore()
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
    if (isAnalyzing) return
    fileInputRef.current?.click()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isAnalyzing) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      fileInputRef.current?.click()
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    if (isAnalyzing) return
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    if (isAnalyzing) return

    const files = Array.from(event.dataTransfer.files)
    const pdfFiles = files.filter((f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))

    if (pdfFiles.length === 0) {
      setError('PDF 파일만 업로드 가능합니다.')
      return
    }

    handleFileValidation(pdfFiles[0])
  }

  const handlePaste = (event: React.ClipboardEvent) => {
    if (isAnalyzing) return

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
    if (isAnalyzing) return
    fileInputRef.current?.click()
  }

  const getDropzoneClasses = () => {
    let classes =
      'flex flex-col justify-center items-center border-2 border-dashed rounded-xl transition-all duration-200 min-h-60 min-w-8/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'

    if (isAnalyzing) {
      classes += ' cursor-not-allowed opacity-75'
    } else if (isDragOver) {
      classes += ' ring-2 border-2'
      // #165ee0 primary color
      classes += ' bg-blue-50 border-blue-600 ring-blue-600/20'
    } else if (error) {
      classes += ' border-red-300 hover:bg-red-50'
    } else {
      classes += ' border-gray-300 hover:bg-gray-50'
    }

    return classes
  }

  return (
    <div className='flex relative justify-center items-center'>
      <div
        className={getDropzoneClasses()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onPaste={handlePaste}
        role='button'
        tabIndex={isAnalyzing ? -1 : 0}
        aria-label='등기부등본 PDF 업로드'
        aria-describedby='upload-help'
      >
        <input
          ref={fileInputRef}
          type='file'
          accept='application/pdf,.pdf,*/*'
          onChange={handleFileSelect}
          className='hidden'
          disabled={isAnalyzing}
          aria-describedby='upload-help'
          aria-label='PDF 파일 선택'
        />

        {file ? (
          <div className='text-center p-6'>
            <CheckIcon
              size={48}
              color={error ? '#E53935' : '#165EE0'}
              className='mx-auto mb-4'
            />
            <p className='font-medium text-mainfont mb-1'>{file.name}</p>
            <p className='text-sm text-gray-500 mb-3'>{formatBytes(file.size)}</p>
            <button
              onClick={handleReplaceFile}
              className='text-sm text-blue-600 hover:text-blue-700 underline'
              disabled={isAnalyzing}
            >
              변경
            </button>
          </div>
        ) : (
          <div className='text-center p-6'>
            <UploadIcon
              size={48}
              color='#9ca3af'
              className='mx-auto mb-4'
            />
            <p className='text-lg font-medium text-mainfont mb-2'>파일을 업로드 해주세요</p>
            <p className='text-sm text-gray-500 mb-4'>드래그하거나 클릭해주세요</p>
            <p className='text-xs text-gray-400'>PDF 파일만 업로드 가능</p>
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
