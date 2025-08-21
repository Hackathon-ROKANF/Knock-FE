import PageHeader from '../components/PageHeader'

import BackButton from '../components/BackButton'

export default function PaymentPage() {
  return (
    <div className='container h-screen overflow-auto no-scrollbar flex flex-col p-6 relative'>
      {/* 백 버튼 - 왼쪽 위 absolute 위치 */}
      <div className='absolute top-4 left-4 z-10'>
        <BackButton/>
      </div>

      <div>
        <PageHeader
          title='결제가 필요해요'
          subtitle='전문가와 검토할 수 있어요'
        />
      </div>
    </div>
  )
}
