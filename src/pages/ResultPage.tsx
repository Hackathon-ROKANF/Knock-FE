import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import ScoreProgress from '../components/ScoreProgress'

import downIcon from '../assets/downIcon.svg' // 경로는 실제 파일 위치에 맞게 조정

export default function ResultPage() {
  const navigate = useNavigate()
  const detailSectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // 임시 점수 - 실제로는 props나 상태에서 받아올 예정
  const analysisScore = 75

  useEffect(() => {
    const handleScroll = () => {
      if (detailSectionRef.current) {
        const element = detailSectionRef.current
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // 요소가 뷰포트에 진입하는 정도를 계산
        const elementTop = rect.top
        const elementBottom = rect.bottom

        // 요소가 화면 중앙에 가까워질수록 progress 증가
        let progress = 0

        if (elementTop < windowHeight && elementBottom > 0) {
          // 요소가 화면에 보이는 경우
          const visibleTop = Math.max(0, windowHeight - elementTop)
          const elementHeight = rect.height
          progress = Math.min(1, visibleTop / (elementHeight * 0.8))
        }

        console.log('Scroll Progress:', progress) // 디버깅용
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 초기 호출

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToDetail = () => {
    if (detailSectionRef.current) {
      detailSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <div className='min-h-screen overflow-y-auto container p-6'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 헤더 */}
        <div className='text-2xl md:text-3xl font-semibold text-mainfont text-center mt-20 mb-[35%]'>
          <h1 className=''>부동산 검토 결과입니다</h1>
          <p className='text-lg text-gray-600'>등기부등본 분석이 완료되었어요</p>
        </div>

        {/* 점수 섹션 */}

        <ScoreProgress
          score={analysisScore}
          size={240}
          strokeWidth={14}
          animationDuration={2.5}
          className='mb-40'
        />

        <div className='flex flex-col text-center items-center'>
          <div>아래로 내려 자세한 분석 결과를 확인하세요</div>
          <img
            src={downIcon}
            alt='Scroll down icon'
            className='cursor-pointer hover:opacity-80 transition-opacity duration-200'
            style={{ filter: 'invert(73%) sepia(6%) saturate(10%) hue-rotate(316deg) brightness(87%) contrast(83%)' }}
            onClick={handleScrollToDetail}
          />
        </div>
        {/* 상세 정보 섹션*/}
        <motion.div
          ref={detailSectionRef}
          className={`mt-12 transition-all duration-1000 ease-out ${scrollProgress < 0.2 ? 'blur-[3px]' : scrollProgress < 0.5 ? 'blur-[2px]' : scrollProgress < 0.8 ? 'blur-[1px]' : 'blur-none'}`}
          style={{
            opacity: Math.max(0.2, 0.2 + scrollProgress * 0.8),
            transform: `scale(${0.9 + scrollProgress * 0.1}) translateY(${30 - scrollProgress * 30}px)`,
          }}
        >
          <div className='space-y-4'>
            <div className='bg-blue-50 rounded-lg p-4'>
              <h3 className='font-semibold text-primary mb-2'>표제부의 [가]는</h3>
              <p className='text-mainfont'>{scrollProgress > 0.6 ? '이 라이언한 아옴포 어떤한 바욕까 토기써 보님에 음잍가 있으면 위험할 수 있어요' : '이 라이언한 아옴포...'}</p>
            </div>

            <div className='bg-blue-50 rounded-lg p-4'>
              <h3 className='font-semibold text-primary mb-2'>표제부의 [나]는</h3>
              <p className='text-mainfont'>{scrollProgress > 0.7 ? '이 라이언한 아옴포 어떤한 바욕까 토기써 보님에 음잍가 있으면 위험할 수 있어요' : '이 라이언한 아옴포...'}</p>
            </div>
          </div>

          <div className='mt-8 pt-6 border-t border-gray-200'>
            <p className='text-center text-gray-600 mb-6'>관심있는 부동산의 추가적인 정보가 필요하다면</p>
          </div>
        </motion.div>

        {/* 액션 버튼 */}
        <div className=''>
          <button
            onClick={() => navigate('/')}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 text-lg'
          >
            전문가 추천 받기
          </button>
        </div>
      </motion.div>
    </div>
  )
}
