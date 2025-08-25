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
      className={`w-full rounded-2xl p-6  shadow-lg border border-gray-200 flex flex-col ${className}`}>

      <div className='flex-shrink-0 mb-3 text-left'>
        <h3 className='text-lg font-bold text-gray-800 leading-relaxed'>"{title}"</h3>
        {source && <p className='text-xs text-gray-500 italic'>{source}</p>}
      </div>

      <div className='flex-1 overflow-y-auto space-y-4 text-left'>
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
