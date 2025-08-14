interface StepbarsProps {
  totalSteps: number
  currentStep: number
}

export default function PageStepbar({ totalSteps, currentStep }: StepbarsProps) {
  return (
    <div className='flex items-center justify-center gap-2'>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-1 w-8 rounded-full transition-colors duration-200 ${index + 1 === currentStep ? 'bg-gray-900' : 'bg-gray-300'}`}
          aria-current={index + 1 === currentStep ? 'step' : undefined}
        />
      ))}
    </div>
  )
}
