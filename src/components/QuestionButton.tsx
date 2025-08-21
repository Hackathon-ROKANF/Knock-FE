import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuestionIcon } from '../assets/icons'

interface TermDefinition {
  term: string
  definition: string
  example?: string
}

interface QuestionButtonProps {
  className?: string
}

const TERM_DEFINITIONS: TermDefinition[] = [
  {
    term: '등기부등본',
    definition: '부동산의 소유권과 권리관계를 공적으로 증명하는 서류예요. 표제부·갑구·을구로 구성돼요.',
    example: '거래 전에 소유자 일치 여부와 담보·압류 같은 위험 요소를 확인해요',
  },
  {
    term: '표제부',
    definition: '부동산의 기본 정보(주소, 면적, 구조, 용도 등)가 적혀 있어요.',
    example: '표제부의 주소와 실제 계약 대상 주소가 일치하는지 확인해요',
  },
  {
    term: '갑구',
    definition: '소유권과 처분 제한 관련 권리(가등기, 가압류, 압류, 경매개시결정 등)가 기재돼요.',
    example: '임대인이 등기부 소유자와 같은지, 압류·가압류가 있는지 확인해요',
  },
  {
    term: '을구',
    definition: '소유권 이외의 권리(근저당권, 전세권 등 담보·용익권)가 기재돼요.',
    example: '근저당권의 채권최고액과 순위를 시세 대비 비율로 점검해요',
  },
  {
    term: '등기기록상태(현행/폐쇄/현행+폐쇄)',
    definition: '현행은 현재 기록만, 폐쇄는 과거 기록만, 현행+폐쇄는 전체 이력을 보여줘요.',
    example: '변동 이력을 보려면 현행+폐쇄로 조회해요',
  },
  {
    term: '가등기',
    definition: '장차 본등기를 할 권리를 보전하는 예약 등기예요.',
    example: '소유권이 곧 넘어갈 수 있어 임차나 매수 시 주의가 필요해요',
  },
  {
    term: '소유권이전청구권',
    definition: '매매계약 등 일정 요건을 갖추면 소유권 이전을 요구할 수 있는 권리예요.',
    example: '가등기와 함께 보이면 향후 소유권 변동 가능성을 염두에 둬요',
  },
  {
    term: '신탁',
    definition: '부동산에 관한 권리가 신탁회사로 이전된 상태예요.',
    example: '임대차나 매매를 하려면 신탁회사 동의를 받아야 해요',
  },
  {
    term: '압류',
    definition: '채무자의 재산 처분을 막기 위해 국가나 채권자가 법적으로 확보한 상태예요.',
    example: '세금 체납 등으로 압류가 있으면 상환·말소 여부를 꼭 확인해요',
  },
  {
    term: '가압류',
    definition: '본안 확정 전 채권 보전을 위해 임시로 재산을 묶는 조치예요.',
    example: '소송 진행 중 보전 목적으로 설정되며 위험 신호로 봐요',
  },
  {
    term: '임차권등기명령',
    definition: '보증금을 돌려받지 못한 임차인이 법원에 신청해 부여받는 등기예요.',
    example: '과거 분쟁 이력이므로 원인과 말소 여부를 확인해요',
  },
  {
    term: '경매개시결정',
    definition: '법원이 부동산에 대한 경매 절차를 시작했다는 뜻이에요.',
    example: '일반적인 임차나 매수는 피하는 게 안전해요',
  },
  {
    term: '근저당권',
    definition: '대출을 담보하기 위해 일정 한도 내 채권을 보전하는 담보권이에요.',
    example: '채권최고액과 순위를 보고 시세 대비 비율을 점검해요',
  },
  {
    term: '채권최고액',
    definition: '근저당권 설정 시 등기에 기재되는 보전 한도액이에요. 실제 대출원금보다 크게 잡히는 경우가 많아요.',
    example: '시세 대비 비율이 높으면 보증금 회수 위험이 커질 수 있어요',
  },
  {
    term: '전세권',
    definition: '임차인이 보증금을 담보로 설정하는 물권이에요.',
    example: '전세권을 설정하면 대항력과 우선변제권 확보에 유리해요',
  },
  {
    term: '안전지표(70% 룰)',
    definition: '대출금과 모든 세입자 보증금 합계가 시세의 70% 미만이면 비교적 안전하다고 봐요.',
    example: '합계가 70%를 넘으면 보증금 회수 위험이 커져요',
  },
]

export default function QuestionButton({ className = '' }: QuestionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}>
      {/* Question Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title='등기부등본 용어 설명'
        className={`
          cursor-pointer rounded-full bg-white
          hover:bg-gray-50 active:scale-95 transition-all duration-200
  
        `}>
        <QuestionIcon
          size={25}
          color={isOpen ? '#2563eb' : '#3b82f6'}
        />
      </button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='absolute top-full right-0 w-85 max-h-100 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50'>
            {/* Header */}

            {/* Scrollable Content */}
            <div className='max-h-80 overflow-y-auto no-scrollbar '>
              {TERM_DEFINITIONS.map((term, index) => (
                <div
                  key={term.term}
                  className={`p-4 ${index !== TERM_DEFINITIONS.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className='mb-2'>
                    <h4 className='font-semibold text-gray-800 text-sm'>{term.term}</h4>
                  </div>
                  <p className='text-gray-600 text-xs leading-relaxed mb-2'>{term.definition}</p>
                  {term.example && (
                    <div className='bg-blue-50 p-2 rounded-md'>
                      <p className='text-blue-700 text-xs'>{term.example}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className='bg-gray-50 p-3 text-center'>
              <p className='text-xs text-gray-500'>어려운 부동산 용어를 쉽게 이해해요</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
