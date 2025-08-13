import SuspiciousScannerHeroLite from './SuspiciousScanner'

export default function DesktopContent() {
  const lines = ['갑구: 가압류 및 가처분 기록 존재', '을구: 근저당권 설정(某은행) 채권최고액 2.5억', '전세가율 92% — 깡통전세 의심']
  const suspects = ['가압류', '가처분', '근저당', '근저당권', '깡통전세', '전세가율']

  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-6xl mx-auto space-y-8'>
        {/* Hero Section with Scanner */}
        <div className='bg-white p-8 rounded-xl shadow-lg border border-gray-200'>
          <h1 className='text-3xl font-bold text-center mb-8 text-gray-900'></h1>
        </div>

        <div className='flex justify-center'>
          <SuspiciousScannerHeroLite
            lines={lines}
            suspects={suspects}
            typeSpeedMs={60}
            scanMs={2000}
            highlightEachMs={600}
            highlightGapMs={600}
            pauseMs={300}
            loop={true}
            nowrap={true}
          />
        </div>
      </div>
    </div>
  )
}
