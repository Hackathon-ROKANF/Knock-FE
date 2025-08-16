import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageStepStore } from '../store/usePageStepStore'
import PageStepbar from '../components/PageStepbar'
import BackButton from '../components/BackButton'

interface AddInfoForm {
  deposit: string // 보증금
  rent: string // 전세금액
  ownerName: string // 소유주명
  ownerContact: string // 소유주 연락처
}

export default function AddInfoPage() {
  const navigate = useNavigate()
  const { currentStep, totalSteps, nextStep } = usePageStepStore()

  const [formData, setFormData] = useState<AddInfoForm>({
    deposit: '',
    rent: '',
    ownerName: '',
    ownerContact: '',
  })

  const handleInputChange = (field: keyof AddInfoForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNext = () => {
    // 폼 유효성 검사 (선택적)
    const isValid = formData.deposit && formData.rent && formData.ownerName

    if (isValid) {
      nextStep()
      // 다음 페이지로 이동 (임시로 result 페이지로)
      navigate('/result')
    }
  }

  const isFormValid = formData.deposit && formData.rent && formData.ownerName

  return (
    <div className='container h-screen flex flex-col p-5'>

      {/* 상단 콘텐츠 영역 (90%) */}
      <div className='flex-[9]'>
        {/* 뒤로가기 버튼 */}
        <div className='pt-4 pb-2'>
          <BackButton to='/' />
        </div>

        {/* Title */}
        <h1 className='text-2xl md:text-3xl font-semibold text-mainfont text-left mb-15'>
          추가적인 정보를 <br />
          입력해주세요
        </h1>

        {/* Form */}
        <div className='space-y-6'>
          {/* 보증금 */}
          <div>
            <label htmlFor='deposit'>보증금</label>
            <input
              type='text'
              id='deposit'
              value={formData.deposit}
              onChange={(e) => handleInputChange('deposit', e.target.value)}
              placeholder='보증금을 입력해주세요'
            />
          </div>

          {/* 전세금액 */}
          <div>
            <label htmlFor='rent'>전세금액</label>
            <input
              type='text'
              id='rent'
              value={formData.rent}
              onChange={(e) => handleInputChange('rent', e.target.value)}
              placeholder='전세금액을 입력해주세요'
            />
          </div>

          {/* 소유주명 */}
          <div>
            <label htmlFor='ownerName'>소유주명</label>
            <input
              type='text'
              id='ownerName'
              value={formData.ownerName}
              onChange={(e) => handleInputChange('ownerName', e.target.value)}
              placeholder='소유주명을 입력해주세요'
            />
          </div>

          {/* 소유주 연락처 */}
          <div>
            <label htmlFor='ownerContact'>소유주 연락처 (선택)</label>
            <input
              type='text'
              id='ownerContact'
              value={formData.ownerContact}
              onChange={(e) => handleInputChange('ownerContact', e.target.value)}
              placeholder='소유주 연락처를 입력해주세요'
            />
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 (10%) */}
      <div className='flex-[1] flex flex-col mb-11'>
        {/* Step Indicator */}
        <div>
          <PageStepbar
            totalSteps={totalSteps}
            currentStep={currentStep}
          />
        </div>

        {/* CTA Button */}
        <div className='mt-12.5'>
          {/* 원래 버튼 */}
          <button
            onClick={handleNext}
            disabled={!isFormValid}
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            다음
          </button>
   
        </div>
      </div>
    </div>
  )
}
