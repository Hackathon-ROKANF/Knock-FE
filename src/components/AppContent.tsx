import mainLogo_blue from '../assets/mainLogo_blue.png'

export default function AppContent() {
  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <img
          src={mainLogo_blue}
          alt='Knock Logo'
          className='mb-4 max-w-[100px]'
        />
      </div>

      <div className='bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl'>
        <h2 className='text-xl font-semibold mb-2'>환영합니다!</h2>
        <p className='opacity-90'>이 콘텐츠는 데스크톱에서는 모바일 시뮬레이션으로, 모바일에서는 전체화면으로 보입니다.</p>
      </div>

      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-lg font-semibold mb-4 text-neutral-dark'>주요 기능</h2>
        <div className='space-y-2'>
          <div className='p-3 bg-neutral-light rounded'>
            <p className='text-sm text-neutral'>기능 1: 사용자 관리</p>
          </div>
          <div className='p-3 bg-neutral-light rounded'>
            <p className='text-sm text-neutral'>기능 2: 데이터 분석</p>
          </div>
          <div className='p-3 bg-neutral-light rounded'>
            <p className='text-sm text-neutral'>기능 3: 알림 설정</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4'>
        <button className='bg-primary text-white p-4 rounded-lg font-medium hover:bg-primary-dark transition-colors'>시작하기</button>
        <button className='bg-secondary text-white p-4 rounded-lg font-medium hover:bg-secondary-dark transition-colors'>설정</button>
        <button className='bg-success text-white p-4 rounded-lg font-medium hover:opacity-90 transition-opacity'>분석하기</button>
      </div>
    </div>
  )
}
