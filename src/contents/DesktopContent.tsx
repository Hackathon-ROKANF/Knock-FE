import LogoMain from '../assets/LogoMain.png'

import CountText from '../components/CountText'

import TextSwiper from '../components/TextSwiper'

import { motion } from 'framer-motion'

import mock_1 from '../assets/mock_1.png'
import mock_2 from '../assets/mock_2.png'
import mock_3 from '../assets/mock_3.png'

export default function DesktopContent() {
  return (
    <div className='p-8 max-h-screen overflow-hidden no-scrollbar'>
      <img
        src={LogoMain}
        alt='Knock Logo'
        onClick={() => (window.location.href = '/')}
        className='cursor-pointer mb-9 max-w-[120px]'
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className='text-left mb-15'>
        <h2 className='text-[40px] font-bold text-gray-800 '>
          전국 전세사기 피해 현황
          <CountText
            from={30000}
            to={30400}
            duration={10000}
          />
          
          <div className='text-sm text-gray-500 font-semibold ml-1'>25.05.31 기준, 전세사기 피해 실태조사(국토교통부)</div>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className='flex items-center justify-center text-center mx-auto max-w-[95%]'>
        <TextSwiper />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className='mb-5'>
        <h1 className='text-4xl text-left font-bold text-gray-800 leading-tight mb-1'>
          <span className='text-blue-600 '>등기부등본</span>이 어려우신가요?
        </h1>
        <p className='text-lg font-medium text-gray-500 leading-relaxed ml-1 text-left '>
          Knock과 함께라면 <span className='font-semibold text-blue-600'> 3분 만에</span> 부동산 위험요소를 파악할 수 있어요
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.0 }}
        className='flex justify-center items-center gap-4 mt-8'>
        <img
          src={mock_1}
          alt='mock_1'
          className='max-w-[25%] mx-4'
        />
        <img
          src={mock_2}
          alt='mock_2'
          className='max-w-[25%] mx-4'
        />
        <img
          src={mock_3}
          alt='mock_3'
          className='max-w-[25%] mx-4'
        />
      </motion.div>
    </div>
  )
}
