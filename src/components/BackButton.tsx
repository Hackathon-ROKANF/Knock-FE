import { useNavigate } from 'react-router-dom'
import { BackIcon } from '../assets/icons'

interface BackButtonProps {
  to?: string
  onClick?: () => void
  className?: string
}

export default function BackButton({ to, onClick, className = '' }: BackButtonProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onClick) {
      onClick()
    }

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
      className={`flex items-center justify-center transition-colors ${className}`}
      aria-label='뒤로가기'
    >
      <BackIcon
        size={24}
        color='currentColor'
      />
    </button>
  )
}
