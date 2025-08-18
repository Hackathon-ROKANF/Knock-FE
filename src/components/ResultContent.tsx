interface ResultContentProps {
  scrollProgress: number
}

export default function ResultContent({ scrollProgress }: ResultContentProps) {
  return (
    <div className='space-y-4'>
      <div className='bg-blue-50 rounded-lg p-4'>
        <h3 className='font-semibold text-primary mb-2'>표제부의 [가]는</h3>
        <p className='text-mainfont'>
          {scrollProgress > 0.3 ? '건축물의 구조와 용도, 면적 등의 기본 정보가 정확히 기재되어 있습니다. 현재 등기된 내용과 실제 사용 용도가 일치하는지 확인이 필요합니다.' : '분석 중...'}
        </p>
      </div>

      <div className='bg-blue-50 rounded-lg p-4'>
        <h3 className='font-semibold text-primary mb-2'>표제부의 [나]는</h3>
        <p className='text-mainfont'>{scrollProgress > 0.4 ? '대지권의 목적인 토지의 표시 부분으로, 토지의 소유권 비율과 권리관계가 명확하게 설정되어 있습니다.' : '분석 중...'}</p>
      </div>

      <div className='bg-green-50 rounded-lg p-4'>
        <h3 className='font-semibold text-green-600 mb-2'>소유권 현황</h3>
        <p className='text-mainfont'>
          {scrollProgress > 0.5 ? '현재 소유자의 권리관계가 명확하며, 가압류나 근저당 등의 제한사항은 발견되지 않았습니다. 안전한 거래가 가능한 상태로 판단됩니다.' : '분석 중...'}
        </p>
      </div>

      <div className='bg-yellow-50 rounded-lg p-4'>
        <h3 className='font-semibold text-yellow-600 mb-2'>주의사항</h3>
        <p className='text-mainfont'>
          {scrollProgress > 0.6 ? '해당 부동산은 개발제한구역에 인접해 있어 향후 개발 시 일부 제약이 있을 수 있습니다. 자세한 사항은 해당 지자체 담당 부서에 문의하시기 바랍니다.' : '분석 중...'}
        </p>
      </div>

      <div className='bg-red-50 rounded-lg p-4'>
        <h3 className='font-semibold text-red-600 mb-2'>추가 확인 필요사항</h3>
        <p className='text-mainfont'>
          {scrollProgress > 0.7 ? '건축물 관련 인허가 사항과 실제 사용승인 내용의 일치 여부를 재확인해야 합니다. 또한 주변 개발계획에 따른 환경 변화도 고려하시기 바랍니다.' : '분석 중...'}
        </p>
      </div>
    </div>
  )
}
