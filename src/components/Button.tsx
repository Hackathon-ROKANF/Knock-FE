import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: React.ReactNode
  loading?: boolean
}

export default function Button({ variant = 'primary', children, loading = false, disabled, className = '', ...props }: ButtonProps) {
  const baseClasses = 'w-full cursor-pointer font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variantClasses = variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 py-3 px-8 text-lg mt-2' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-8'

  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : ''

  const finalClassName = `${baseClasses} ${variantClasses} ${disabledClasses} ${className}`.trim()

  return (
    <button
      className={finalClassName}
      disabled={disabled || loading}
      {...props}>
      {loading ? '분석 중...' : children}
    </button>
  )
}
