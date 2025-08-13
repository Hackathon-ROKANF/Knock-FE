// SuspiciousScannerHeroLite.tsx
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Phase = 'typing' | 'scan' | 'highlight' | 'done'
type Token = { text: string; suspicious: boolean }

interface Props {
  lines: string[]
  suspects: string[]
  typeSpeedMs?: number // 글자당 타이핑 속도
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
    .map((p) => ({
      text: p,
      suspicious: suspects.some((w) => p.toLowerCase() === w.toLowerCase()),
    }))
}

export default function SuspiciousScannerHeroLite({
  lines = ['갑구: 가압류 및 가처분 기록 존재', '을구: 근저당권 설정(某은행) 채권최고액 2.5억', '전세가율 92% — 깡통전세 의심'],
  suspects = ['가압류', '가처분', '근저당', '근저당권', '깡통전세', '전세가율'],
  typeSpeedMs = 300, // 스텝형 타이핑: 글자당 35ms
  scanMs = 900, // 스캔 바 이동 시간
  highlightEachMs = 380, // 하이라이트 각 단어 시간
  highlightGapMs = 140, // 하이라이트 간격 시간
  pauseMs = 700,
  loop = true,
  nowrap = true,
}: Props) {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [charIdx, setCharIdx] = useState(0)
  const line = lines[idx] ?? ''
  const tokens = useMemo(() => splitBySuspects(line, suspects), [line, suspects])
  const suspiciousPositions = useMemo(() => tokens.map((t, i) => (t.suspicious ? i : -1)).filter((i) => i >= 0), [tokens])

  // 1) 타자기(스텝) 타이핑: setInterval로 글자 수 증가
  useEffect(() => {
    if (phase !== 'typing') return
    if (charIdx >= line.length) {
      // 타이핑 끝 → 스캔
      setPhase('scan')
      return
    }
    const id = window.setInterval(() => {
      setCharIdx((c) => Math.min(c + 1, line.length))
    }, typeSpeedMs)
    return () => window.clearInterval(id)
  }, [phase, charIdx, line.length, typeSpeedMs])

  // 2) 스캔 → 3) 하이라이트 → 4) 다음 라인
  useEffect(() => {
    if (phase === 'scan') {
      const id = window.setTimeout(() => setPhase('highlight'), scanMs)
      return () => window.clearTimeout(id)
    }
    if (phase === 'highlight') {
      const total = suspiciousPositions.length ? totalHighlightTimeMs(suspiciousPositions.length, highlightEachMs, highlightGapMs) : 0
      const id = window.setTimeout(() => setPhase('done'), total)
      return () => window.clearTimeout(id)
    }
    if (phase === 'done') {
      const id = window.setTimeout(() => {
        setIdx((i) => {
          const next = i + 1
          return !loop && next >= lines.length ? i : next % lines.length
        })
        setPhase('typing')
        setCharIdx(0)
      }, pauseMs)
      return () => window.clearTimeout(id)
    }
  }, [phase, scanMs, highlightEachMs, highlightGapMs, pauseMs, suspiciousPositions.length, loop, lines.length])

  // 하이라이트 지연 계산 유틸
  const delayOf = (tokenIndex: number) => (suspiciousPositions.indexOf(tokenIndex) * (highlightGapMs + highlightEachMs)) / 1000

  return (
    <div
      role='status'
      aria-live='polite'
      className={`relative text-gray-900 font-bold tracking-tight leading-tight
                  text-2xl md:text-3xl ${nowrap ? 'whitespace-nowrap' : ''} font-mono`}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className='relative inline-block'
        >
          {/* 1) 타이핑 중엔 잘린 텍스트 + 블링크 커서 */}
          {phase === 'typing' && (
            <span className='relative'>
              <span>{line.slice(0, charIdx)}</span>
              {/* 커서 */}
              <motion.span
                aria-hidden
                className='inline-block align-baseline w-[2px] h-[1em] ml-[1px] bg-primary'
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.9, repeat: Infinity }}
                style={{ boxShadow: '0 0 10px rgba(34,211,238,0.8)' }}
              />
            </span>
          )}

          {/* 타이핑 이후에는 전체 라인 출력 */}
          {phase !== 'typing' && (
            <span className='relative'>
              {tokens.map((t, i) =>
                t.suspicious ? (
                  <motion.span
                    key={i}
                    initial={{ color: 'currentColor' }}
                    animate={phase === 'highlight' ? { color: '#FF4545' } : { color: 'currentColor' }}
                    transition={{
                      delay: phase === 'highlight' ? delayOf(i) : 0,
                      duration: phase === 'highlight' ? highlightEachMs / 1000 : 0.2,
                      ease: 'easeOut',
                    }}
                  >
                    {t.text}
                  </motion.span>
                ) : (
                  <span key={i}>{t.text}</span>
                )
              )}
            </span>
          )}

          {/* 2) 스캐너 바 */}
          {phase === 'scan' && (
            <motion.span
              aria-hidden
              className='pointer-events-none absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-primary'
              initial={{ left: '0%' }}
              animate={{ left: '100%' }}
              transition={{ duration: scanMs / 1000, ease: 'linear' }}
              style={{ boxShadow: '0 0 15px rgba(34,211,238,0.8), 0 0 25px rgba(34,211,238,0.5)' }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function totalHighlightTimeMs(count: number, each: number, gap: number) {
  // 각 단어: (each) 만큼 강조, 단어 사이 간격(gap) 포함
  // 간단히 count * (each + gap) 으로 계산
  return count * (each + gap)
}
