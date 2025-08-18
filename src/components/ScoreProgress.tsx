import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from 'framer-motion'

interface ScoreProgressProps {
  score: number // 0-100 점수
  size: number // 원의 크기 (px)
  strokeWidth: number // 선의 두께
  animationDuration: number // 애니메이션 지속시간 (초)
  className: string
}

export default function ScoreProgress({ score,  size = 200, strokeWidth = 12, animationDuration = 2, className = '' }: ScoreProgressProps) {
  const [currentDisplayScore, setCurrentDisplayScore] = useState(0)

  // 원의 중심과 반지름 계산
  const center = size / 2
  const radius = center - strokeWidth / 2

  // 원의 둘레 계산
  const circumference = 2 * Math.PI * radius

  // 점수 비율 계산 100 점 기준
  const scorePercentage = Math.min(Math.max(score, 0), 100) / 100

  // Motion values for animations
  const pathLength = useMotionValue(0)
  const animatedScore = useMotionValue(0)

  // Transform motion values
  const pathLengthSpring = useTransform(pathLength, [0, 1], [circumference, circumference - scorePercentage * circumference])

  // Update display score when animation value changes
  useMotionValueEvent(animatedScore, 'change', (latest) => {
    setCurrentDisplayScore(Math.round(latest))
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      // Animate both progress bar and score simultaneously
      animate(pathLength, 1, {
        duration: animationDuration,
        ease: 'easeOut',
      })

      animate(animatedScore, score, {
        duration: animationDuration,
        ease: 'easeOut',
      })
    }, 500) // 0.5초 후 시작

    return () => clearTimeout(timer)
  }, [pathLength, animatedScore, score, animationDuration])

  // 점수에 따른 색상 결정
  const getScoreColor = (currentScore: number) => {
    if (currentScore >= 80) return '#10B981' // green-500
    if (currentScore >= 60) return '#3B82F6' // blue-500
    if (currentScore >= 40) return '#F59E0B' // amber-500
    return '#EF4444' // red-500
  }

  const currentColor = getScoreColor(score)

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className='relative'
        style={{ width: size, height: size }}
      >
        {/* 배경 원 */}
        <svg
          width={size}
          height={size}
          className='transform rotate-90 scale-x-[-1]'
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke='#E5E7EB'
            strokeWidth={strokeWidth}
            fill='transparent'
            className='opacity-30'
          />

          {/* 진행 원 */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            stroke={currentColor}
            strokeWidth={strokeWidth}
            fill='transparent'
            strokeDasharray={circumference}
            strokeLinecap='round'
            className='transition-colors duration-300 ease-out'
            style={{
              strokeDashoffset: pathLengthSpring,
            }}
          />
        </svg>

        {/* 중앙 점수 텍스트 */}
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className='text-center'
          >
            <motion.div
              className='text-4xl font-bold mb-1'
              style={{ color: currentColor }}
            >
              <motion.span style={{ display: 'inline-block' }}>{currentDisplayScore}점</motion.span>
            </motion.div>
            {/* <div className='text-sm text-gray-500'>{maxScore}점 만점</div> */}
          </motion.div>
        </div>
      </div>

      {/* 점수 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className='mt-4 text-center'
      >
        <motion.div
          className='text-lg font-semibold text-gray-800 mb-1'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {score >= 80 && '매우 우수'}
          {score >= 60 && score < 80 && '우수'}
          {score >= 40 && score < 60 && '보통'}
          {score < 40 && '주의 필요'}
        </motion.div>
        <div className='text-sm text-gray-600'>등기부등본 분석 결과</div>
      </motion.div>
    </div>
  )
}
