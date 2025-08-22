import { motion } from 'framer-motion'

interface TextSlideProps {
  title: string
  content: string[]
  source?: string
  delay?: number
  className?: string
}

export default function TextSlide({ title, content, source, delay = 0, className = '' }: TextSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`bg-white rounded-2xl p-6 shadow-xl border border-gray-100 h-full flex flex-col ${className}`}>
      {/* 제목과 출처 */}
      <div className='flex-shrink-0 mb-6'>
        <h3 className='text-lg font-bold text-gray-800 leading-relaxed'>"{title}"</h3>
        {source && <p className='text-xs text-gray-500 italic'>{source}</p>}
      </div>

      {/* 내용 - 스크롤 가능 */}
      <div className='flex-1 overflow-y-auto space-y-4'>
        {content.map((paragraph, index) => (
          <p
            key={index}
            className='text-gray-700 leading-relaxed text-sm'>
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  )
}
