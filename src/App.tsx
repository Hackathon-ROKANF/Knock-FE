import DesktopLayout from './layouts/DesktopLayout'
import MobileLayout from './layouts/MobileLayout'

export default function App() {
  return (
    <>
      {/* 데스크톱에서만 표시 */}
      <div className='hidden md:block'>
        <DesktopLayout />
      </div>

      {/* 모바일에서만 표시 */}
      <div className='md:hidden'>
        <MobileLayout />
      </div>
    </>
  )
}
