import MobileLayout from './MobileLayout'
import DesktopContent from '../components/DesktopContent'

export default function DesktopLayout() {
  return (
    <div className='hidden md:flex h-screen bg-gray-50 px-[5%] '>
      <div className='flex w-full h-full no-scrollbar'>
        <div className='flex-1 min-w-0'>
          <DesktopContent />
        </div>

        <div className='w-[400px] min-w-[350px] max-w-[450px] overflow-y-auto no-scrollbar flex-shrink-0'>
          <MobileLayout />
        </div>
      </div>
    </div>
  )
}
