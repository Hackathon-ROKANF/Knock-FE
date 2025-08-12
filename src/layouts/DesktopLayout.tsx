import { useState } from 'react'
import { motion } from 'framer-motion'
import MobileLayout from './MobileLayout'
import DesktopSidebar from '../components/DesktopContent'

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
          {/* 왼쪽 데스크톱 사이드바 */}
          <div className='w-2/3 bg-white overflow-y-auto'>
            <DesktopSidebar />
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
          animate={{ paddingLeft: '13%', paddingRight: '13%' }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* 왼쪽 데스크톱 사이드바 */}
          <motion.div
            className='bg-white overflow-y-auto'
            initial={{ width: '66.666667%' }}
            animate={{ width: '50%' }}
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <DesktopSidebar />
          </motion.div>

          {/* 오른쪽 앱 화면 */}
          <motion.div
            className='bg-gray-50 overflow-y-auto'
            initial={{ width: '33.333333%' }}
            animate={{ width: '50%' }}
            transition={{
              duration: 1,
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
