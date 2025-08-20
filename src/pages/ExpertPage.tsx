import { useNavigate } from 'react-router-dom'
import ExpertContent from '../contents/ExpertContent'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'

export default function ExpertPage() {
  const navigate = useNavigate()

  return (
    <div className='container h-screen overflow-hidden flex flex-col p-6 '>
      <div className='flex-[9]'>
        <PageHeader
          title='부동산 전문가와 검토하기'
          subtitle='등기부등본 이외에도 다양한 요소를 고려해야 해요'
          textAlign='left'
        />

        <ExpertContent />
      </div>

      <div className='flex-[1] flex flex-col'>
        <Button
          onClick={() => navigate(-1)}
          variant='secondary'>
          돌아가기
        </Button>
      </div>
    </div>
  )
}
