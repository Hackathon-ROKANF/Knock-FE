interface InfoBoxProps {
  label: string
  value: string
  variant?: 'default' | 'current' | 'past'
  colSpan?: boolean
}

export default function InfoBox({ label, value, variant = 'default', colSpan = false }: InfoBoxProps) {
  const getStyles = () => {
    switch (variant) {
      case 'current':
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          labelColor: 'text-blue-600',
          valueColor: 'text-blue-800',
        }
      case 'past':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          labelColor: 'text-green-600',
          valueColor: 'text-green-800',
        }
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          labelColor: 'text-gray-600',
          valueColor: 'text-gray-900',
        }
    }
  }

  const styles = getStyles()

  return (
    <div className={`p-3 ${styles.bgColor} rounded-lg border ${styles.borderColor} ${colSpan ? 'col-span-2' : ''}`}>
      <p className={`text-xs ${styles.labelColor} mb-1`}>{label}</p>
      <p className={`text-sm font-medium ${styles.valueColor}`}>{value}</p>
    </div>
  )
}
