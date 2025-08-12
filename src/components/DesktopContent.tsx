

export default function DesktopContent() {
  return (
    <div className='p-8 bg-gray-50'>
      <div className='space-y-6'>
        <div className='p-6 bg-primary-light/20 rounded-lg border border-primary-light'>
          <h3 className='text-lg font-semibold text-primary-dark mb-2'>데스크톱 전용 영역</h3>
          <p className='text-primary'>PC에서만 보이는 추가 기능들을 여기에 배치할 수 있습니다.</p>
        </div>

        <nav className='space-y-2'>
          <h4 className='font-semibold text-neutral-dark'>메뉴</h4>
          <button className='block w-full text-left p-3 bg-neutral-light rounded hover:bg-primary-light/20 transition-colors'>대시보드</button>
          <button className='block w-full text-left p-3 bg-neutral-light rounded hover:bg-primary-light/20 transition-colors'>분석</button>
          <button className='block w-full text-left p-3 bg-neutral-light rounded hover:bg-primary-light/20 transition-colors'>설정</button>
        </nav>

        <div className='p-4 bg-secondary-light/20 rounded-lg border border-secondary-light'>
          <h4 className='font-semibold text-secondary-dark mb-2'>통계</h4>
          <div className='grid grid-cols-2 gap-4'>
            <div className='text-center'>
              <p className='text-2xl font-bold text-secondary'>42</p>
              <p className='text-sm text-neutral'>총 사용자</p>
            </div>
            <div className='text-center'>
              <p className='text-2xl font-bold text-success'>98%</p>
              <p className='text-sm text-neutral'>성공률</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
