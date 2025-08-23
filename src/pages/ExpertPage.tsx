import ExpertContent from '../contents/ExpertContent'
import PageHeader from '../components/PageHeader'

import BackButton from '../components/BackButton'

export default function ExpertPage() {

  return (
    <div className='container h-screen overflow-auto no-scrollbar flex flex-col p-6 relative'>
      {/* 백 버튼 - 왼쪽 위 absolute 위치 */}
      <div className='absolute top-4 left-4 z-10'>
        <BackButton to='/result' />
      </div>

      <div>
        <PageHeader
          title='전문가와 상담하기'
          subtitle='등기부등본 이외에도 고려할 사항이 많아요'
        />

        <ExpertContent />
      </div>

    </div>
  )
}
