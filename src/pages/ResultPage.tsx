import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ResultPage() {
  const navigate = useNavigate()


  return (
    <div className='h-screen flex flex-col items-center justify-center bg-white p-6'>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className='text-3xl font-semibold text-mainfont mb-6'>
          분석 완료!
        </h1>

        <p className='text-lg text-gray-600 mb-8'>
          등기부등본 분석이 완료되었습니다.
        </p>

        <div className="bg-gray-100 rounded-lg p-6 max-w-md mx-auto mb-8">
          <p className="text-sm text-gray-700">
            여기에 분석 결과가 표시됩니다.
          </p>
        </div>

        <button
          onClick={() => navigate('/')
        }
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200'
        >
          처음으로 돌아가기
        </button>
      </motion.div>
    </div>
  )
}
