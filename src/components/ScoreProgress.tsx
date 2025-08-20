import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface ScoreProgressProps {
  prediction: '안전' | '관심' | '주의' | '위험' // 예측 결과
  riskProbability: string // 위험도 확률 (예: "63.65%")
  size: number // 원의 크기 (px)
  strokeWidth: number // 선의 두께
  animationDuration: number // 애니메이션 지속시간 (초)
  className: string
}

export default function ScoreProgress({ riskProbability, size = 200, strokeWidth = 12, animationDuration = 2, className = '' }: Omit<ScoreProgressProps, 'prediction'>) {
  // 위험도 확률을 점수로 변환 (위험도가 낮을수록 높은 점수)
  const riskPercentage = parseFloat(riskProbability.replace('%', ''))
  const score = Math.round(100 - riskPercentage)

  // 점수에 따른 예측 결과 계산
  const getScorePrediction = (scoreValue: number) => {
    if (scoreValue === 100) return '안전'
    if (scoreValue >= 66) return '관심'
    if (scoreValue >= 33) return '주의'
    return '위험'
  }

  const calculatedPrediction = getScorePrediction(score)

  // 원의 중심과 반지름 계산
  const center = size / 2
  const radius = center - strokeWidth / 2

  // 원의 둘레 계산
  const circumference = 2 * Math.PI * radius

  // 점수 비율 계산 100 점 기준
  const scorePercentage = Math.min(Math.max(score, 0), 100) / 100

  // Motion values for animations
  const pathLength = useMotionValue(0)

  // Transform motion values
  const pathLengthSpring = useTransform(pathLength, [0, 1], [circumference, circumference - scorePercentage * circumference])

  useEffect(() => {
    const timer = setTimeout(() => {
      // Animate progress bar
      animate(pathLength, 1, {
        duration: animationDuration,
        ease: 'easeOut',
      })
    }, 500) // 0.5초 후 시작

    return () => clearTimeout(timer)
  }, [pathLength, score, animationDuration])

  // 점수에 따른 색상 결정 (예측 결과 기반)
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
        {/* 배경 원 */}
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
            className='text-center'>
            <motion.div
              className='text-4xl font-bold mt-1 mb-1'
              style={{ color: currentColor }}>
              <motion.span style={{ display: 'inline-block' }}>{score}점</motion.span>
            </motion.div>
            {/* <div className='text-sm text-gray-500'>{calculatedPrediction}</div> */}
          </motion.div>
        </div>
      </div>

      {/* 점수 설명 */}
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
          {calculatedPrediction === '안전' && '안전해요'}
          {calculatedPrediction === '관심' && '관심이 필요해요'}
          {calculatedPrediction === '주의' && '주의가 필요해요'}
          {calculatedPrediction === '위험' && '위험해요'}
        </motion.div>
        {/* <div className='text-sm text-gray-600'>등기부등본 분석 결과</div> */}
      </motion.div>
    </div>
  )
}
