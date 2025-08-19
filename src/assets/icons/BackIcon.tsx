interface BackIconProps {
  className?: string
  color?: string
  size?: number
}

export default function BackIcon({ className = '', color = 'currentColor', size = 24 }: BackIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 12 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.0006 19.438L8.95563 20.5L1.28963 12.71C1.10513 12.5197 1.00195 12.2651 1.00195 12C1.00195 11.7349 1.10513 11.4803 1.28963 11.29L8.95563 3.5L10.0006 4.563L2.68263 12L10.0006 19.438Z'
        fill={color}
      />
    </svg>
  )
}
