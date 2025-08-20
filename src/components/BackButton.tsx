import { useNavigate } from 'react-router-dom'
import { BackIcon } from '../assets/icons'

interface BackButtonProps {
  to?: string
  disabled?: boolean
}

export default function BackButton({ to, disabled=false }: BackButtonProps) {
  const navigate = useNavigate()

  const handleBack = () => {

    if (disabled) return

    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  return (
    <button
      onClick={handleBack}
      className={'flex items-center justify-center transition-colors cursor-pointer'}
      aria-label='뒤로가기'>
      <BackIcon
        size={24}
        color='currentColor'
      />
    </button>
  )
}
