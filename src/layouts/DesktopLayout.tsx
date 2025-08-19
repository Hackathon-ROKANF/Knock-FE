import MobileLayout from './MobileLayout'
import DesktopContent from '../components/DesktopContent'

export default function DesktopLayout() {
  return (
    <div className='hidden md:flex h-screen bg-gray-50 px-[10%] '>
      <div className='flex w-full h-full no-scrollbar'>
        <div className='flex-1 min-w-[60%] overflow-y-auto no-scrollbar'>
          <DesktopContent />
        </div>

        <div className='max-w-[35%] w-full overflow-y-auto no-scrollbar flex-shrink-0 border-gray-100 border shadow-sm'>
          <MobileLayout />
        </div>
      </div>
    </div>
  )
}
