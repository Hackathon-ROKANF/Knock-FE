interface UploadIconProps {
  className?: string
  color?: string
  size?: number
}

export default function UploadIcon({ className = '', color = 'currentColor', size = 30 }: UploadIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M15 3.75V18.75M15 3.75L21.25 10M15 3.75L8.75 10M26.25 18.75V23.75C26.25 24.413 25.9866 25.0489 25.5178 25.5178C25.0489 25.9866 24.413 26.25 23.75 26.25H6.25C5.58696 26.25 4.95107 25.9866 4.48223 25.5178C4.01339 25.0489 3.75 24.413 3.75 23.75V18.75'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
