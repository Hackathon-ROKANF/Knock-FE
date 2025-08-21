import LogoMain from '../assets/LogoMain.png'
import certifiedCopy from '../assets/certifiedCopy.png'

import CountText from '../components/CountText'
import TypographyText from '../components/TypographyText'
import { motion } from 'framer-motion'

// import TrueFocus from '../components/TrueFocus'

export default function DesktopContent() {
  return (
    <div className='p-8 min-h-screen overflow-hidden'>
      <img
        src={LogoMain}
        alt='Knock Logo'
        onClick={() => (window.location.href = '/')}
        className='cursor-pointer mb-4 max-w-[100px]'
      />
      <div className='max-w-6xl mx-auto space-y-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          <h2 className='text-4xl font-bold text-gray-800 mb-2'>
            전국 전세사기 피해 현황{' '}
            <CountText
              from={30000}
              to={30400}
              duration={10000}
            />
          </h2>
          <div className='text-sm  text-gray-500 mt-2 ml-2'>25.05.31 기준, 전세사기 피해 실태조사(국토교통부)</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}>
          <h1 className='text-4xl font-bold text-gray-900 leading-tight mb-4'>
            <span className='text-blue-600'>등기부등본</span>이<br />
            어려우신가요?
          </h1>
          <p className='text-xl text-gray-600 leading-relaxed ml-2'>
            Knock과 함께라면
            <br />
            <span className='font-semibold text-blue-600'>3분 만에</span> 부동산 위험요소를 파악할 수 있어요
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}>
          <TypographyText />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}>
          <img
            src={certifiedCopy}
            alt='certifiedCopy'
            className='max-w-[80%]'
          />
        </motion.div>
        {/* <TrueFocus
          sentence='MINJI HANNI DANIELLE HAERIN HYEIN'
          manualMode={false}
          blurAmount={3}
          borderColor='#165ee0'
          animationDuration={2}
          pauseBetweenAnimations={1}
        /> */}
      </div>
    </div>
  )
}
