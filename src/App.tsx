import { BrowserRouter } from 'react-router-dom'
import DesktopLayout from './layouts/DesktopLayout'
import MobileLayout from './layouts/MobileLayout'

export default function App() {
  return (
    <BrowserRouter>
      {/* 데스크톱에서만 표시 */}
      <div className='hidden md:block'>
        <DesktopLayout />
      </div>

      {/* 모바일에서만 표시 */}
      <div className='md:hidden'>
        <MobileLayout />
      </div>
    </BrowserRouter>
  )
}
