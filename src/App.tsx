import { BrowserRouter } from 'react-router-dom'
import DesktopLayout from './layouts/DesktopLayout'
import MobileLayout from './layouts/MobileLayout'

export default function App() {
  return (
    <BrowserRouter>
      {/* 데스크톱 */}
      <div className='hidden md:block'>
        <DesktopLayout />
      </div>

      {/* 모바일 */}
      <div className='md:hidden'>
        <MobileLayout />
      </div>
    </BrowserRouter>
  )
}
