import Basic_logo from '../assets/Basic_logo.png'

import TypographyText from './TypographyText'

export default function DesktopContent() {
  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <img
        src={Basic_logo}
        alt='Knock Logo'
        className='mb-4 max-w-[150px]'
      />
      <div className='max-w-6xl mx-auto space-y-8'>
        <div className='flex'>
          <TypographyText />
        </div>
      </div>
    </div>
  )
}
