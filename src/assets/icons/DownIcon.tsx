interface DownIconProps {
  className?: string
  color?: string
  size?: number
}

export default function DownIcon({ className = '', color = 'currentColor', size = 35 }: DownIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 35 35'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M8.75 13.125L17.5 21.875L26.25 13.125'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
