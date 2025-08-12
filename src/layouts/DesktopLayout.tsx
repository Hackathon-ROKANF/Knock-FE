import { useState } from 'react'
import { motion } from 'framer-motion'
import MobileLayout from './MobileLayout'

export default function DesktopLayout() {
  const [isFocused, setIsFocused] = useState(false)

  const handleMobileClick = () => {
    if (!isFocused) {
      setIsFocused(true) // 한번만 클릭 가능
    }
  }

  return (
    // 데스크톱에서만 표시 - 768px 이상
    <div className='hidden md:flex h-screen bg-gray-100'>
      {/* 일반 div로 시작 - 클릭 후에만 motion 적용 */}
      {!isFocused ? (
        <div className='flex w-full'>
          {/* 왼쪽 데스크톱 추가 레이아웃 */}
          <div className='w-2/3 bg-white overflow-y-auto'>
            <div className='p-8'>
              <h1 className='text-4xl font-bold text-gray-800 mb-8'>Knock App</h1>
              <div className='space-y-6'>
                <div className='p-6 bg-blue-50 rounded-lg'>
                  <h3 className='text-lg font-semibold text-blue-800 mb-2'>데스크톱 전용 영역</h3>
                  <p className='text-blue-600'>PC에서만 보이는 추가 기능들을 여기에 배치할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 앱 화면 */}
          <div
            className='w-1/3 bg-gray-50 overflow-y-auto cursor-pointer'
            onClick={handleMobileClick}
          >
            <MobileLayout />
          </div>
        </div>
      ) : (
        // 클릭 후 애니메이션 적용
        <motion.div
          className='flex w-full'
          initial={{ paddingLeft: '0%', paddingRight: '0%' }}
          animate={{ paddingLeft: '15%', paddingRight: '15%' }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* 왼쪽 데스크톱 추가 레이아웃 */}
          <motion.div
            className='bg-white overflow-y-auto'
            initial={{ width: '66.666667%' }}
            animate={{ width: '50%' }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className='p-8'>
              <h1 className='text-4xl font-bold text-gray-800 mb-8'>Knock App</h1>
              <div className='space-y-6'>
                <div className='p-6 bg-blue-50 rounded-lg'>
                  <h3 className='text-lg font-semibold text-blue-800 mb-2'>데스크톱 전용 영역</h3>
                  <p className='text-blue-600'>PC에서만 보이는 추가 기능들을 여기에 배치할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 오른쪽 앱 화면 */}
          <motion.div
            className='bg-gray-50 overflow-y-auto'
            initial={{ width: '33.333333%' }}
            animate={{ width: '50%' }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <MobileLayout />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
