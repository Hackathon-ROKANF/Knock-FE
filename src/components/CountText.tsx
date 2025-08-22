import { useState, useEffect } from 'react'

interface CountTextProps {
  from?: number
  to?: number
  duration?: number
  className?: string
}

export default function CountText({ from = 10000, to = 30400, duration = 3000, className = '' }: CountTextProps) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp

      const progress = Math.min((timestamp - startTime) / duration, 1)

      // easeOut 효과를 위한 cubic-bezier 함수
      const easeOut = 1 - Math.pow(1 - progress, 3)

      const currentCount = Math.floor(from + (to - from) * easeOut)
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [from, to, duration])

  return (
    <span className={`font-bold relative ${className}`}>
      <span className='text-right text-red-500 tabular-nums'>{' '}{count.toLocaleString('ko-KR')}</span>
      <span className='ml-1'>건</span>
    </span>
  )
}
