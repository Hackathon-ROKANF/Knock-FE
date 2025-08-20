import { motion } from 'framer-motion'
import ExpertCard from '../components/ExpertCard'

export default function ExpertContent() {
  const experts = [
    {
      name: '강해린 변호사',
      specialty: '부동산전문',
      experience: '법률서무 경력 15년',
      description: '부동산 거래·경매 전문, 소송 경험과 노하우로 복잡한 권리관계도 안전하게 해결해드립니다.',
      rating: 4.9,
      reviewCount: 127,
      profileImage: 'https://i.pinimg.com/736x/e3/b7/cd/e3b7cd0ae1447d6255d9e043900162e9.jpg',
    },
    {
      name: '팜하니 공인중개사',
      specialty: '부동산중개',
      experience: '중개업무 경력 20년',
      description: '아파트·오피스텔 전문, 시세 분석과 투자 가치 평가를 통해 맞춤형 컨설팅을 제공합니다.',
      rating: 4.7,
      reviewCount: 156,
      profileImage: 'https://i.pinimg.com/1200x/f5/e9/9e/f5e99ef52e658c8aeffd17ec38752b8d.jpg',
    },
    {
      name: '김민지 법무사',
      specialty: '부동산등기',
      experience: '등기업무 경력 18년',
      description: '소유권 이전, 근저당 설정/말소 등 등기 실무 경험이 풍부하여 안전한 거래를 지원합니다.',
      rating: 4.8,
      reviewCount: 92,
      profileImage: 'https://i.pinimg.com/736x/78/86/71/788671883decd559b76a61a0063bb20e.jpg',
    },
    {
      name: '이혜인 감정평가사',
      specialty: '부동산감정',
      experience: '감정평가 경력 8년',
      description: '정확한 시세 평가와 리스크 분석을 통해 합리적인 투자 판단을 도와드립니다.',
      rating: 4.9,
      reviewCount: 73,
      profileImage: 'https://i.pinimg.com/736x/07/b3/ac/07b3ac2fb39db7554a1badbc0c9d94a8.jpg',
    },
    {
      name: '다니엘 세무사',
      specialty: '부동산세무',
      experience: '세무 경력 11년',
      description: '양도소득세·취득세 등 부동산 세금 문제를 꼼꼼하게 검토하여 절세 전략을 제시합니다.',
      rating: 4.8,
      reviewCount: 64,
      profileImage: 'https://i.pinimg.com/736x/d8/52/36/d85236aa93bb10a8272a91d620f6dc5a.jpg',
    },
  ]

  return (
    <div className='flex flex-col -mt-[20%]'>
      {experts.map((expert, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: index * 0.2,
            ease: 'easeOut',
          }}>
          <ExpertCard
            name={expert.name}
            specialty={expert.specialty}
            experience={expert.experience}
            description={expert.description}
            rating={expert.rating}
            reviewCount={expert.reviewCount}
            profileImage={expert.profileImage}
          />
        </motion.div>
      ))}
    </div>
  )
}
