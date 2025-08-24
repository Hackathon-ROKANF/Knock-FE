import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 이미지 import
import flow1 from '../assets/flow/Group 2358.png'
import flow2 from '../assets/flow/Group 2359.png'
import flow3 from '../assets/flow/Group 2360.png'
import flow4 from '../assets/flow/Group 2361.png'
import flow5 from '../assets/flow/Group 2362.png'
import flow6 from '../assets/flow/Group 2363.png'
import flow7 from '../assets/flow/Group 2364.png'
import flow8 from '../assets/flow/Group 2365.png'

interface ImageSlideProps {
  title?: string
  className?: string
}

const FLOW_IMAGES = [
  { id: 1, src: flow1, alt: '흐름 1단계' },
  { id: 2, src: flow2, alt: '흐름 2단계' },
  { id: 3, src: flow3, alt: '흐름 3단계' },
  { id: 4, src: flow4, alt: '흐름 4단계' },
  { id: 5, src: flow5, alt: '흐름 5단계' },
  { id: 6, src: flow6, alt: '흐름 6단계' },
  { id: 7, src: flow7, alt: '흐름 7단계' },
  { id: 8, src: flow8, alt: '흐름 8단계' },
]

export default function ImageSlide({ title = '분석 과정', className = '' }: ImageSlideProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % FLOW_IMAGES.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + FLOW_IMAGES.length) % FLOW_IMAGES.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full rounded-2xl p-6 shadow-lg border border-gray-200 flex flex-col ${className}`}>
      {/* 제목 */}
      <div className='flex-shrink-0 mb-4 text-left'>
        <h3 className='text-lg font-bold text-gray-800 leading-relaxed'>"{title}"</h3>
      </div>

      {/* 슬라이드 컨테이너 */}
      <div className='relative flex-1 flex flex-col'>
        {/* 이미지 영역 */}
        <div className='relative overflow-hidden rounded-lg bg-gray-50 flex-1 min-h-64'>
          <AnimatePresence mode='wait'>
            <motion.img
              key={currentIndex}
              src={FLOW_IMAGES[currentIndex].src}
              alt={FLOW_IMAGES[currentIndex].alt}
              className='w-full h-full object-contain'
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* 좌/우 네비게이션 버튼 */}
          <button
            onClick={prevSlide}
            className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110'
            aria-label='이전 이미지'>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110'
            aria-label='다음 이미지'>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>

        {/* 도트 인디케이터 */}
        <div className='flex justify-center mt-4 space-x-2'>
          {FLOW_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex ? 'bg-blue-500 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`${index + 1}번째 이미지로 이동`}
            />
          ))}
        </div>

        {/* 현재 페이지 표시 */}
        <div className='text-center mt-2'>
          <span className='text-sm text-gray-500'>
            {currentIndex + 1} / {FLOW_IMAGES.length}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
