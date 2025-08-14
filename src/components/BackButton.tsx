import { useNavigate } from 'react-router-dom'
import { usePageStepStore } from '../store/usePageStepStore'

interface BackButtonProps {
  to?: string
  onClick?: () => void
  className?: string
}

export default function BackButton({ to, onClick, className = '' }: BackButtonProps) {
  const navigate = useNavigate()
  const { prevStep } = usePageStepStore()

  const handleBack = () => {
    if (onClick) {
      onClick()
    }

    // 이전 스텝으로 변경
    prevStep()

    // 페이지 네비게이션
    if (to) {
      navigate(to)
    } else {
      navigate(-1) // 브라우저 히스토리 뒤로가기
    }
  }

  return (
    <button
      onClick={handleBack}
      className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ${className}`}
      aria-label='뒤로가기'
    >
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='text-gray-700'
      >
        <path d='m15 18-6-6 6-6' />
      </svg>
    </button>
  )
}
