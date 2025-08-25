import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface ScoreProgressProps {
  prediction: '안전' | '관심' | '주의' | '위험'
  riskProbability: string
  size: number 
  strokeWidth: number 
  animationDuration: number 
  className: string
}

export default function ScoreProgress({ riskProbability, size = 200, strokeWidth = 12, animationDuration = 2, className = '' }: Omit<ScoreProgressProps, 'prediction'>) {

  const riskPercentage = parseFloat(riskProbability.replace('%', ''))
  const score = Math.round(100 - riskPercentage)

  const getScorePrediction = (scoreValue: number) => {
    if (scoreValue === 100) return '안전'
    if (scoreValue >= 66) return '관심'
    if (scoreValue >= 33) return '주의'
    return '위험'
  }

  const calculatedPrediction = getScorePrediction(score)

  const center = size / 2
  const radius = center - strokeWidth / 2

  const circumference = 2 * Math.PI * radius

  const scorePercentage = Math.min(Math.max(score, 0), 100) / 100

  const pathLength = useMotionValue(0)

  const pathLengthSpring = useTransform(pathLength, [0, 1], [circumference, circumference - scorePercentage * circumference])

  useEffect(() => {
    const timer = setTimeout(() => {
      animate(pathLength, 1, {
        duration: animationDuration,
        ease: 'easeOut',
      })
    }, 500) 

    return () => clearTimeout(timer)
  }, [pathLength, score, animationDuration])

  const getPredictionColor = (pred: string) => {
    switch (pred) {
      case '안전':
        return '#10B981' // green-500
      case '관심':
        return '#3B82F6' // blue-500
      case '주의':
        return '#F59E0B' // amber-500
      case '위험':
        return '#EF4444' // red-500
      default:
        return '#6B7280' // gray-500
    }
  }

  const currentColor = getPredictionColor(calculatedPrediction)

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`relative w-[${size}px] h-[${size}px]`}>
        <svg
          width={size}
          height={size}
          className='transform rotate-90 scale-x-[-1]'>
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke='#E5E7EB'
            strokeWidth={strokeWidth}
            fill='transparent'
            className='opacity-30'
          />

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

        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className='text-center'>
            <motion.div
              className='text-4xl font-bold mt-1 mb-1'
              style={{ color: currentColor }}>
              <motion.span style={{ display: 'inline-block' }}>{score}점</motion.span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className='mt-4 text-center'>
        <motion.div
          className='text-lg font-semibold text-gray-800 mb-1'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}>
          {calculatedPrediction === '안전' && '특별한 문제가 발견되지 않았어요'}
          {calculatedPrediction === '관심' && '조금 더 살펴보시는 것을 권해요'}
          {calculatedPrediction === '주의' && '이 집은 주의가 필요해요'}
          {calculatedPrediction === '위험' && '각별한 주의가 필요해요'}
        </motion.div>
      </motion.div>
    </div>
  )
}
