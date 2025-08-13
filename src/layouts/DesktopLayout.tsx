import MobileLayout from './MobileLayout'
import DesktopSidebar from '../components/DesktopContent'

export default function DesktopLayout() {
  return (
    // 데스크톱에서만 표시 - 768px 이상
    <div className='hidden md:flex h-screen bg-gray-100'>
      <div className='flex w-full'>
        {/* 왼쪽 데스크톱 사이드바 */}
        <div className='w-2/3 bg-white overflow-y-auto'>
          <DesktopSidebar />
        </div>

        {/* 오른쪽 앱 화면 */}
        <div className='w-1/3 bg-gray-50 overflow-y-auto'>
          <MobileLayout />
        </div>
      </div>
    </div>
  )
}
