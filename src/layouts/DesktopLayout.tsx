import MobileLayout from './MobileLayout'
import DesktopContent from '../components/DesktopContent'

export default function DesktopLayout() {
  return (
    <div className='hidden md:flex h-screen bg-gray-50 px-[10%] '>
      <div className='flex w-full h-full no-scrollbar'>
        <div className='flex-1 min-w-0'>
          <DesktopContent />
        </div>

        <div className='min-w-[500px] max-w-[550px] overflow-y-auto no-scrollbar flex-shrink-0 border-gray-100 border shadow-sm'>
          <MobileLayout />
        </div>
      </div>
    </div>
  )
}
