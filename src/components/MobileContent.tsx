
export default function MobileContent() {
  return (
    <div className='space-y-6'>
      <div className='text-center'>
        
      </div>

      <div className='bg-gradient-to-r from-primary to-secondary p-6 rounded-xl'>
        <h2 className='text-xl font-semibold mb-2'>환영합니다!</h2>
        <p className='opacity-90'>이 콘텐츠는 데스크톱에서는 모바일 시뮬레이션으로, 모바일에서는 전체화면으로 보입니다.</p>
      </div>

      

      <div className='grid grid-cols-1 gap-4'>
        <button className='bg-primary text-white p-4 rounded-lg font-medium hover:bg-primary-dark transition-colors'>시작하기</button>
      </div>
    </div>
  )
}
