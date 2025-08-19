interface CheckIconProps {
  className?: string
  color?: string
  size?: number
}

export default function CheckIcon({ className = '', color = 'currentColor', size = 30 }: CheckIconProps) {
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
        d='M11.9375 22.5L4.8125 15.375L6.59375 13.5938L11.9375 18.9375L23.4062 7.46875L25.1875 9.25L11.9375 22.5Z'
        fill={color}
      />
    </svg>
  )
}
