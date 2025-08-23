import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LogoDouble from '../assets/LogoDouble.png'

export default function FirstPage() {
  const [showSplash, setShowSplash] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // 2.5초 후에 UploadPage로 이동
    const timer = setTimeout(() => {
      setShowSplash(false)
      // 애니메이션 완료 후 페이지 이동
      setTimeout(() => {
        navigate('/upload')
      }, 800)
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen w-full overflow-hidden ">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="flex items-center justify-center z-50"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            <motion.div
              className="flex items-center justify-center h-screen "
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut"
              }}
            >
              <motion.img
                src={LogoDouble}
                alt="Knock Logo"
                className="max-w-xs md:max-w-md lg:max-w-lg h-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
