import LogoMain from '../assets/LogoMain.png'

import TypographyText from '../components/TypographyText'
import { motion } from 'framer-motion'

import TrueFocus from '../components/TrueFocus'

export default function DesktopContent() {
  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <img
        src={LogoMain}
        alt='Knock Logo'
        onClick={() => (window.location.href = '/')}
        className='cursor-pointer mb-4 max-w-[150px]'
      />
      <div className='max-w-6xl mx-auto space-y-8'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          <h1 className='text-5xl font-bold text-gray-900 leading-tight mb-4'>
            <span className='text-blue-600'>등기부등본</span>이<br />
            어려우신가요?
          </h1>
          <p className='text-xl text-gray-600 leading-relaxed'>
            Knock과 함께라면
            <br />
            <span className='font-semibold text-blue-600'>3분 만에</span> 등기부등본의 위험요소를 파악할 수 있어요
          </p>
        </motion.div>
        <div className='flex'>
          <TypographyText />
        </div>
        <TrueFocus
          sentence='MINJI HANNI DANIELLE HAERIN HYEIN'
          manualMode={false}
          blurAmount={3}
          borderColor='#165ee0'
          animationDuration={2}
          pauseBetweenAnimations={1}
        />
      </div>
    </div>
  )
}
