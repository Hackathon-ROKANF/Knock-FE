import { motion } from 'framer-motion'

interface StepbarsProps {
  totalSteps: number
  currentStep: number
}

export default function PageStepbar({ totalSteps, currentStep }: StepbarsProps) {
  return (
    <div className='flex items-center justify-center gap-2'>
      {Array.from({ length: totalSteps }, (_, index) => {
        const isActive = index + 1 === currentStep

        return (
          <motion.div
            key={index}
            className={`h-1 w-8 rounded-full ${isActive ? 'text-mainfont' : 'bg-gray-300'}`}
            initial={{ scale: 0.8 }}
            animate={{
              scale: isActive ? 1.1 : 1,
              backgroundColor: isActive ? '#212329' : '#d1d5db',
              height: isActive ? '5px' : '4px',
            }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            whileHover={{ scale: isActive ? 1.2 : 1.1 }}
            aria-current={isActive ? 'step' : undefined}
          />
        )
      })}
    </div>
  )
}
