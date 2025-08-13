import MobileLayout from './MobileLayout'
import DesktopSidebar from '../components/DesktopContent'

export default function DesktopLayout() {
  return (
    <div className='hidden md:flex h-screen bg-gray-100 mx-[3%] '>
      <div className='flex w-full h-full bg-white  overflow-hidden'>
        <div className='w-2/3 bg-white overflow-y-auto no-scrollbar'>
          <DesktopSidebar />
        </div>

        <div className='w-1/3 bg-gray-50 border-l border-gray-200 overflow-y-auto no-scrollbar'>
          <MobileLayout />
        </div>
      </div>
    </div>
  )
}
