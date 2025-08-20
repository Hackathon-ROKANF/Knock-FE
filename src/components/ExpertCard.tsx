import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConsultationModal from './ConsultationModal'

interface ExpertCardProps {
  name: string
  specialty: string
  experience: string
  description: string
  rating?: number
  reviewCount?: number
  profileImage?: string
}

export default function ExpertCard({ name, specialty, experience, description, rating = 5.0, reviewCount = 50, profileImage }: ExpertCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleConsultationStart = () => {
    setIsModalOpen(true)
  }

  const handleConfirm = () => {
    setIsModalOpen(false)
    // 결제 페이지로 이동 (나중에 구현)
    navigate('/payment')
    console.log(`${name}님과 상담 시작`)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  return (
    <div className='bg-white rounded-2xl p-4 shadow-md border border-gray-100 mb-3'>
      <div className='flex items-start gap-3'>
        {/* 프로필 이미지 영역 */}
        <div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden'>
          {profileImage ? (
            <img
              src={profileImage}
              alt={`${name} 프로필`}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
          )}
        </div>

        {/* 정보 영역 */}
        <div className='flex-1 min-w-0'>
          {/* 이름과 전문분야 */}
          <div className='flex items-center gap-2 mb-1'>
            <h3 className='text-base font-bold text-gray-900 truncate'>{name}</h3>
            <span className='text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full whitespace-nowrap'>{specialty}</span>
          </div>

          {/* 경력과 평점 */}
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm text-blue-600 font-medium truncate'>{experience}</span>
            <div className='flex items-center gap-1 flex-shrink-0'>
              <span className='text-yellow-400 text-sm'>★</span>
              <span className='text-sm font-medium text-gray-700'>{rating}</span>
              <span className='text-xs text-gray-400'>| 리뷰수</span>
              <span className='text-xs text-gray-400'>{reviewCount}+</span>
            </div>
          </div>

          {/* 설명 */}
          <p className='text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2'>{description}</p>

          {/* 상담 버튼 */}
          <button
            onClick={handleConsultationStart}
            className='w-full cursor-pointer bg-white border border-blue-500 text-blue-500 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-1'>
            상담 시작하기
          </button>
        </div>
      </div>

      {/* 상담 확인 모달 */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        expertName={name}
      />
    </div>
  )
}
