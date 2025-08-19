import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  animationDelay?: number
  textAlign?: 'left' | 'center' | 'right'
}

export default function PageHeader({ title, subtitle, className, titleClassName = '', subtitleClassName = 'text-lg text-gray-600', animationDelay = 0, textAlign = 'center' }: PageHeaderProps) {
  const baseClassName = `text-2xl md:text-3xl font-semibold text-mainfont text-${textAlign} mt-20 mb-[35%]`
  const finalClassName = className || baseClassName

  return (
    <motion.div
      className={finalClassName}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: animationDelay }}
    >
      <h1 className={titleClassName}>{title}</h1>
      {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
    </motion.div>
  )
}
