import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import TextSlide from './TextSlide'

import 'swiper/css'
import 'swiper/css/pagination'

// 텍스트 슬라이드 데이터
const textSlideData = [
  {
    title: '등기부등본만 제대로 봤어도 전세사기 90%는 막을 수 있었습니다.',
    content: [
      "최근 급증한 '강동전세' 피해자들의 공통점은 하나다. 계약 전에 임대인의 재산 상태나 부채 규모를 제대로 확인하지 못했다는 것이다. 하지만 등기부등본만 꼼꼼히 들여다봤어도, 근저당권이나 선순위 채권 등 명백한 위험 신호를 충분히 포착할 수 있었을 것이다.",
    ],
    source: '엄정숙 | 부동산전문변호사, 2025'
  },
  {
    title: '전세사기 피하려면, 등기부등본 적어도 4번 확인하세요.',
    content: ['전세 계약 전에 가장 먼저 해야 할 일은 무엇일까. 바로 계약할 물건과 임대인에 대한 조사다. 먼저 전세로 살고 싶은 집의 등기부등본을 떼어보고 "선순위채권"이 있는지 확인해야 한다.'],
    source: '매일경제 | 손동우 기자, 2023',
  },
  {
    title: '정보는 있는데, 접근권이 없다.',
    content: ['등기부등본은 누구나 열람할 수 있지만, 그 정보를 해석하고 판단하는 건 또 다른 문제다. 특히 사회초년생, 고령자, 외국인 임차인일수록 정보 해석의 장벽은 높다. 그 사이를 파고드는 것이 바로 조직적인 전세사기 수법이다.'],
    source: '엄정숙 | 부동산전문변호사, 2025',
  },
  
]

export default function TextSwiper() {
  return (
    <div className='w-full max-w-4xl h-70'>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        className='text-swiper'>
        {textSlideData.map((slide, index) => (
          <SwiperSlide
            key={index}
            className='max-w-full'>
            <div className='p-8 '>
              <TextSlide
                title={slide.title}
                content={slide.content}
                source={slide.source}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
