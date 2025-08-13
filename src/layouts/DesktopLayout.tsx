import MobileLayout from './MobileLayout'
import DesktopContent from '../components/DesktopContent'

export default function DesktopLayout() {
  return (
    <div className='hidden md:flex h-screen bg-orange-200 px-[5%] '>
      <div className='flex w-full h-fulloverflow-hidden'>
        <div className='w-2/3 overflow-y-hidden no-scrollbar'>
          <DesktopContent />
        </div>

        <div className='w-1/3 overflow-y-hidden no-scrollbar'>
          <MobileLayout />
        </div>
      </div>
    </div>
  )
}
