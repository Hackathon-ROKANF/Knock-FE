import LogoMain from '../assets/LogoMain.png'

import TypographyText from '../components/TypographyText'

export default function DesktopContent() {
  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <img
        src={LogoMain}
        alt='Knock Logo'
        onClick={() => window.location.href = '/'}
        className='cursor-pointer mb-4 max-w-[150px]'
      />
      <div className='max-w-6xl mx-auto space-y-8'>
        <div className='flex'>
          <TypographyText />
        </div>
      </div>
    </div>
  )
}
