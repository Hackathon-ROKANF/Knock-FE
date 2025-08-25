import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuestionIcon } from '../assets/icons'

// 이미지 import
import flow1 from '../assets/flow/1.png'
import flow2 from '../assets/flow/2.png'
import flow3 from '../assets/flow/3.png'
import flow4 from '../assets/flow/4.png'
import flow5 from '../assets/flow/5.png'
import flow6 from '../assets/flow/6.png'
import flow7 from '../assets/flow/7.png'
import flow8 from '../assets/flow/8.png'

interface FlowStep {
  id: number
  src: string
  alt: string
  title: string
  description: string
}

interface QuestionButtonProps {
  className?: string
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: 1,
    src: flow1,
    alt: '등기부등본 발급 1단계',
    title: '1단계: 인터넷등기소 접속',
    description: '인터넷등기소(www.iros.go.kr)에 접속해 주소를 검색해요.',
  },
  {
    id: 2,
    src: flow2,
    alt: '등기부등본 발급 2단계',
    title: '2단계: 소재지번 선택',
    description: '검색한 주소의 소재지번을 확인해요.',
  },
  {
    id: 3,
    src: flow3,
    alt: '등기부등본 발급 3단계',
    title: '3단계: 등기기록유형 선택',
    description: '전부+말소사항 포함으로 발급하면 정확한 분석이 가능해요.',
  },
  {
    id: 4,
    src: flow4,
    alt: '등기부등본 발급 4단계',
    title: '4단계: 결제대상 확인',
    description: '발급하고자 하는 소재지가 맞는지 확인해요.',
  },
  {
    id: 5,
    src: flow5,
    alt: '등기부등본 발급 5단계',
    title: '5단계: 결제하기',
    description: '결제수단을 선택하고 결제를 진행해요.',
  },
  {
    id: 6,
    src: flow6,
    alt: '등기부등본 발급 6단계',
    title: '6단계: 발급 완료',
    description: '결제가 완료되면 확인버튼을 눌러요.',
  },
  {
    id: 7,
    src: flow7,
    alt: '등기부등본 발급 7단계',
    title: '7단계: 등기부등본 열람',
    description: '열람 버튼을 눌러 등기부등본을 확인해요.',
  },
  {
    id: 8,
    src: flow8,
    alt: '등기부등본 발급 8단계',
    title: '8단계: 등기부등본 다운로드',
    description: '저장 버튼을 눌러 등기부등본을 pdf로 다운로드해요.',
  },
]

export default function UploadQuestionButton({ className = '' }: QuestionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const nextSlide = () => {
    setSlideDirection('next')
    setCurrentIndex((prevIndex) => (prevIndex + 1) % FLOW_STEPS.length)
  }

  const prevSlide = () => {
    setSlideDirection('prev')
    setCurrentIndex((prevIndex) => (prevIndex - 1 + FLOW_STEPS.length) % FLOW_STEPS.length)
  }

  const goToSlide = (index: number) => {
    if (index > currentIndex) {
      setSlideDirection('next')
    } else if (index < currentIndex) {
      setSlideDirection('prev')
    }
    setCurrentIndex(index)
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}>
      {/* Question Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title='등본 발급 과정 안내'
        className={`
          cursor-pointer rounded-full bg-white
          hover:bg-gray-50 active:scale-95 transition-all duration-200
  
        `}>
        <QuestionIcon
          size={25}
          color={isOpen ? '#2563eb' : '#3b82f6'}
        />
      </button>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.1 }}
            className='absolute top-full right-0 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-40'>
            등기부등본은 어떻게 발급받나요?
            {/* 화살표 */}
            <div className='absolute -top-1 right-3 w-2 h-2 bg-gray-800 rotate-45'></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='absolute top-full right-0 w-[90vw] sm:w-[250px] lg:w-[280px] xl:w-[320px] 2xl:w-[410px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50'>
            {/* Header */}

            {/* Image Slide Container */}
            <div className='p-3 sm:p-4 md:p-5 lg:p-6'>
              {/* 이미지 영역 */}
              <div className='relative overflow-hidden rounded-lg bg-gray-50 h-60 lg:h-[180px] 2xl:h-[300px]  mb-3 sm:mb-4'>
                <AnimatePresence mode='wait'>
                  <motion.img
                    key={currentIndex}
                    src={FLOW_STEPS[currentIndex].src}
                    alt={FLOW_STEPS[currentIndex].alt}
                    className='w-full h-full object-contain'
                    initial={{
                      opacity: 0,
                      x: slideDirection === 'prev' ? -100 : 100,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: slideDirection === 'prev' ? 100 : -100,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                </AnimatePresence>

                {/* 좌/우 네비게이션 버튼 */}
                <button
                  onClick={prevSlide}
                  className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 md:p-2 shadow-md transition-all duration-200 hover:scale-110 cursor-pointer'
                  aria-label='이전 이미지'>
                  <svg
                    className='w-4 h-4 md:w-5 md:h-5'
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
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 md:p-2 shadow-md transition-all duration-200 hover:scale-110 cursor-pointer'
                  aria-label='다음 이미지'>
                  <svg
                    className='w-4 h-4 md:w-5 md:h-5'
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

              {/* 제목과 설명 */}
              <div className='mb-4 md:mb-6'>
                <h4 className='text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3'>{FLOW_STEPS[currentIndex].title}</h4>
                <div className='text-xs md:text-sm text-gray-600 leading-relaxed'>
                  {currentIndex === 0 ? (
                    <>
                      인터넷등기소(
                      <a
                        href='https://www.iros.go.kr'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 underline font-medium'>
                        www.iros.go.kr
                      </a>
                      )에 접속해 주소를 검색해요.
                    </>
                  ) : (
                    FLOW_STEPS[currentIndex].description
                  )}
                </div>
              </div>

              {/* 도트 인디케이터 */}
              <div className='flex justify-center space-x-1.5 md:space-x-2 mb-2'>
                {FLOW_STEPS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-200 ${index === currentIndex ? 'bg-blue-500 w-4 md:w-5' : 'bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`${index + 1}번째 이미지로 이동`}
                  />
                ))}
              </div>

              {/* 현재 페이지 표시 */}
              {/* <div className='text-center'>
                <span className='text-xs text-gray-500'>
                  {currentIndex + 1} / {FLOW_STEPS.length}
                </span>
              </div> */}
            </div>

            {/* Footer */}
            {/* <div className='bg-gray-50 p-3 text-center border-t border-gray-200'>
              <p className='text-xs text-gray-500'>등기부등본 발급 방법을 단계별로 확인해보세요</p>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
