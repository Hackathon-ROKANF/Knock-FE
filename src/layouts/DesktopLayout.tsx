import MobileLayout from './MobileLayout'
import DesktopContent from '../components/DesktopContent'

export default function DesktopLayout() {
  return (
    <div className='hidden md:flex h-screen bg-gray-50 px-[5%] '>
      <div className='flex w-full h-full no-scrollbar'>
        <div className='w-8/10'>
          <DesktopContent />
        </div>

        <div className='w-3/10 overflow-y-auto no-scrollbar'>
          <MobileLayout />
        </div>
      </div>
    </div>
  )
}
