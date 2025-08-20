import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Phase = 'typing' | 'delay' | 'scan' | 'scanComplete' | 'highlight' | 'done'
type Token = { text: string; suspicious: boolean }

interface Props {
  lines?: string[]
  suspects?: string[]
  typeSpeedMs?: number
  scanMs?: number
  highlightEachMs?: number
  highlightGapMs?: number
  pauseMs?: number
  loop?: boolean
}

const escapeReg = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const buildRegex = (words: string[]) => (words.length ? new RegExp(`(${words.map(escapeReg).join('|')})`, 'gi') : null)

const splitBySuspects = (line: string, suspects: string[]): Token[] => {
  const rx = buildRegex(suspects)
  if (!rx) return [{ text: line, suspicious: false }]

  return line
    .split(rx)
    .filter(Boolean)
    .map((part) => ({
      text: part,
      suspicious: suspects.some((word) => part.toLowerCase() === word.toLowerCase()),
    }))
}

const defaultLines = [
  // danger.pdf (동작구 상도동 다인캐슬2차 301호)
  '소유권이전청구권 가등기가 설정되어 있어요.',
  '국민건강보험공단의 압류가 등기되어 있어요.',
  '강제경매개시결정(2025타경10----)이 있어요.',
  '신용보증기금의 가압류가 기재되어 있어요.',
  '근저당권의 채권최고액이 36억원으로 등록되어 있어요.',
  '임차권등기명령으로 임차보증금 3억원이 설정되어 있어요.',
  '임차권은 전유부분 전부에 대한 것으로 표시되어 있어요.',

  '근저당권 변경으로 채권최고액이 4억원으로 변경되었어요.',
  '소유권이전(2018년 11월) 이후 등기의 변동 이력이 있어요.',
];

const defaultSuspects = [
  // 소유권/처분제한·집행
  '가등기', '소유권이전청구권', '압류', '강제경매개시결정', '가압류',
  // 점유·임차 관련
   '임차권등기명령', '임차권', '전세권', '확정일자', '주민등록일자', '점유개시일자',
  // 담보권
  '근저당권', '근저당권설정', '채권최고액', '공동담보',
  // 그 밖의 빈출 위험어
  '경매', '대항력 포기', '매매예약', '부기', '말소'
];
export default function TypographyText({
  lines = defaultLines,
  suspects = defaultSuspects,
  typeSpeedMs = 80,
  scanMs = 1700,
  highlightEachMs = 600,
  highlightGapMs = 400,
  pauseMs = 2500,
  loop = true,
}: Props) {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [charIdx, setCharIdx] = useState(0)

  const line = lines[idx] ?? ''
  const tokens = useMemo(() => splitBySuspects(line, suspects), [line, suspects])
  const suspiciousPositions = useMemo(() => tokens.map((t, i) => (t.suspicious ? i : -1)).filter((i) => i >= 0), [tokens])

  const highlightDelay = (tokenIndex: number) => (suspiciousPositions.indexOf(tokenIndex) * (highlightEachMs + highlightGapMs)) / 1000

  useEffect(() => {
    if (phase !== 'typing') return

    if (charIdx >= line.length) {
      const id = window.setTimeout(() => setPhase('delay'), 1000)
      return () => clearTimeout(id)
    }

    const id = setInterval(() => {
      setCharIdx((prev) => Math.min(prev + 1, line.length))
    }, typeSpeedMs)

    return () => clearInterval(id)
  }, [phase, charIdx, line.length, typeSpeedMs])

  useEffect(() => {
    const timeouts = {
      delay: () => setPhase('scan'),
      scan: () => setPhase('scanComplete'),
      scanComplete: () => setPhase('highlight'),
      highlight: () => setPhase('done'),
      done: () => {
        setIdx((prev) => (loop ? (prev + 1) % lines.length : Math.min(prev + 1, lines.length - 1)))
        setPhase('typing')
        setCharIdx(0)
      },
    }

    const delays = {
      delay: 500,
      scan: scanMs,
      scanComplete: 500,
      highlight: suspiciousPositions.length * (highlightEachMs + highlightGapMs) + 1000,
      done: pauseMs,
    }

    if (phase in timeouts) {
      const id = window.setTimeout(timeouts[phase as keyof typeof timeouts], delays[phase as keyof typeof delays])
      return () => clearTimeout(id)
    }
  }, [phase, scanMs, highlightEachMs, highlightGapMs, pauseMs, suspiciousPositions.length, loop, lines.length])

  const isHighlightPhase = phase === 'scanComplete' || phase === 'highlight' || phase === 'done'
  const shouldShowCursor = phase === 'typing'
  const shouldShowScan = phase === 'scan' || phase === 'scanComplete'

  return (
    <div
      role='status'
      aria-live='polite'
      className={`relative text-gray-800 font-semibold tracking-wide leading-relaxed
                  text-3xl `}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='relative'
        >
          <span>
            {isHighlightPhase ? (
              <span>
                {tokens.map((token, i) =>
                  token.suspicious ? (
                    <motion.span
                      key={i}
                      initial={{ backgroundColor: 'rgba(255, 235, 59, 0)', color: '#374151', y: 0 }}
                      animate={
                        phase === 'highlight' || phase === 'done'
                          ? {
                              y: phase === 'highlight' ? [0, -1, 1, -1, 1, 0] : 0,
                              backgroundColor: 'rgba(255, 235, 59, 0.4)',
                              color: '#b71c1c',
                            }
                          : { y: 0, backgroundColor: 'rgba(255, 235, 59, 0)', color: '#374151' }
                      }
                      transition={{
                        delay: phase === 'highlight' ? highlightDelay(i) : 0,
                        duration: phase === 'highlight' ? highlightEachMs / 1000 : 0.3,
                        ease: 'easeInOut',
                      }}
                      className='rounded-sm'
                    >
                      {token.text}
                    </motion.span>
                  ) : (
                    <span key={i}>{token.text}</span>
                  )
                )}
              </span>
            ) : (
              <span>
                <span>{line.slice(0, charIdx)}</span>
                <span className={shouldShowCursor ? 'opacity-0' : 'opacity-100'}>{line.slice(charIdx)}</span>
              </span>
            )}
          </span>

          {shouldShowScan && (
            <motion.div
              className='absolute top-0 bottom-0 left-0 h-full bg-blue-500/20 rounded-lg'
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: scanMs / 1000, ease: 'easeOut' }}/>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
