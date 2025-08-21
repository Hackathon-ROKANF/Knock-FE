interface QuestionIconProps {
  size?: number
  color?: string
  className?: string
}

export default function QuestionIcon({ size = 24, color = '#6b7280', className = '' }: QuestionIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}>
      <circle
        cx='12'
        cy='12'
        r='10'
        stroke={color}
        strokeWidth='2'
      />
      <path
        d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle
        cx='12'
        cy='17'
        r='1'
        fill={color}
      />
    </svg>
  )
}
