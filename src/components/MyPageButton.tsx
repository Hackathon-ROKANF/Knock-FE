import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface MyPageButtonProps {
  className?: string
}

export default function MyPageButton({ className = '' }: MyPageButtonProps) {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    navigate('/mypage')
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title='내 분석 목록'
        className='cursor-pointer rounded-full w-5'>
        <svg
          width={25}
          height={25}
          viewBox='0 0 24 24'
          fill='none'
          stroke='#3b82f6'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/>
          <circle
            cx={12}
            cy={7}
            r={4}
          />
        </svg>
      </button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.1 }}
            className='absolute top-full right-0 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-40'>
            마이페이지
            <div className='absolute -top-1 right-3 w-2 h-2 bg-gray-800 rotate-45'></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
