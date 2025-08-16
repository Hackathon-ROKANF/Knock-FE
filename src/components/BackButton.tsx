import { useNavigate } from 'react-router-dom'
import { usePageStepStore } from '../store/usePageStepStore'

import backIcon from '../assets/back.svg'

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
      className={`flex items-center justify-center transition-colors ${className}`}
    >
      <img
        src={backIcon}
        alt='뒤로가기'
      />
    </button>
  )
}
