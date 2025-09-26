interface AnalysisResultCardProps {
  address: string
  riskLevel: '안전' | '관심' | '주의' | '위험'
  analysisDate: string
  onViewDetails?: () => void
}

export default function AnalysisResultCard({ address, riskLevel, analysisDate, onViewDetails }: AnalysisResultCardProps) {
  // 위험도별 색상 설정
  const getRiskStyles = (level: string) => {
    switch (level) {
      case '안전':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-600',
          tagBg: 'bg-green-100',
          tagText: 'text-green-600',
          buttonBorder: 'border-green-500',
          buttonText: 'text-green-500',
          buttonHover: 'hover:bg-green-50',
        }
      case '관심':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-600',
          tagBg: 'bg-blue-100',
          tagText: 'text-blue-600',
          buttonBorder: 'border-blue-500',
          buttonText: 'text-blue-500',
          buttonHover: 'hover:bg-blue-50',
        }
      case '주의':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-600',
          tagBg: 'bg-yellow-100',
          tagText: 'text-yellow-600',
          buttonBorder: 'border-yellow-500',
          buttonText: 'text-yellow-600',
          buttonHover: 'hover:bg-yellow-50',
        }
      case '위험':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-600',
          tagBg: 'bg-red-100',
          tagText: 'text-red-600',
          buttonBorder: 'border-red-500',
          buttonText: 'text-red-500',
          buttonHover: 'hover:bg-red-50',
        }
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-600',
          tagBg: 'bg-gray-100',
          tagText: 'text-gray-600',
          buttonBorder: 'border-gray-500',
          buttonText: 'text-gray-500',
          buttonHover: 'hover:bg-gray-50',
        }
    }
  }

  const styles = getRiskStyles(riskLevel)

  return (
    <div className='bg-white rounded-2xl p-4 shadow-md border border-gray-100 mb-3'>
      <div className='flex items-start gap-3'>
        {/* 위험도 아이콘 영역 */}
        <div className={`w-12 h-12 ${styles.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
          <span className={`${styles.textColor} font-bold ${riskLevel.length > 2 ? 'text-xs' : 'text-sm'}`}>{riskLevel}</span>
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex items-start gap-2 mb-1 min-h-[3rem]'>
            <h4 className='text-base font-bold text-gray-900 text-left leading-6'>{address}</h4>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-gray-500 truncate'>{analysisDate}</span>
            <div className='flex items-center gap-1 flex-shrink-0'>
              <span
                onClick={onViewDetails}
                className='text-sm font-semibold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors'>
                {`상세결과보기 →`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
