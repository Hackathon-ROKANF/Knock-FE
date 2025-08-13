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
  nowrap?: boolean
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
  '갑구에 소유권 이전을 위한 가등기가 설정되었어요.',
  '을구의 채권최고액과 보증금의 합이 시세의 80%를 초과해요.',
  '특약: 임대인의 사정으로 계약 해지 시 위약금은 발생하지 않아요.',
  '전입 세입자의 임차권등기명령 기록이 존재해요.',
  '부동산이 신탁등기 상태이므로, 신탁회사의 동의가 필요해요.',
  '집주인의 세금 체납으로 인한 압류 기록이 있어요.',
]

const defaultSuspects = ['가등기', '채권최고액', '위약금', '임차권등기명령', '신탁등기', '압류', '가압류', '경매', '대항력 포기']

export default function TypographyText({
  lines = defaultLines,
  suspects = defaultSuspects,
  typeSpeedMs = 80,
  scanMs = 1700,
  highlightEachMs = 600,
  highlightGapMs = 400,
  pauseMs = 2500,
  loop = true,
  nowrap = true,
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
                  text-3xl md:text-4xl ${nowrap ? 'whitespace-nowrap' : ''}`}
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
                      initial={{ backgroundColor: 'rgba(255, 235, 59, 0)', color: 'inherit', y: 0 }}
                      animate={
                        phase === 'highlight' || phase === 'done'
                          ? {
                              y: phase === 'highlight' ? [0, -1, 1, -1, 1, 0] : 0,
                              backgroundColor: 'rgba(255, 235, 59, 0.4)',
                              color: '#b71c1c',
                            }
                          : { y: 0, backgroundColor: 'rgba(255, 235, 59, 0)', color: 'inherit' }
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
              transition={{ duration: scanMs / 1000, ease: 'easeOut' }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
