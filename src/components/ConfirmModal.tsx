import { motion, AnimatePresence } from 'framer-motion'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message: string
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title = '확인', message }: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className='fixed z-40 inset-0 bg-[rgba(0,0,0,0.4)]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className='fixed z-50 flex items-center justify-center px-4 inset-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div
              className='bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 '
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}>

              <div className='text-center mb-4'>
                <h3 className='text-lg font-semibold text-mainfont'>{title}</h3>
              </div>

              <div className='text-center mb-8'>
                <p className='text-gray-700 leading-relaxed whitespace-pre-line'>{message}</p>
              </div>

              <div className='flex space-x-3'>
                <button
                  onClick={onClose}
                  className='flex-1 px-4 py-3 cursor-pointer bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200'>
                  취소
                </button>
                <button
                  onClick={onConfirm}
                  className='flex-1 px-4 py-3 bg-blue-600 cursor-pointer text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200'>
                  확인
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
