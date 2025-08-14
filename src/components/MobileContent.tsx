import { Routes, Route } from 'react-router-dom'

import UploadPage from '../pages/UploadPage'
import AddInfoPage from '../pages/AddInfoPage'

export default function MobileContent() {
  return (
    <Routes>
      <Route
        path='/'
        element={<UploadPage />}
      />
      <Route
        path='/addInfo'
        element={<AddInfoPage />}
      />
      {/* <Route
        path='/result'
        element={<div className='p-4'>Result Page Placeholder</div>} // Replace with actual ResultPage component
      /> */}
    </Routes>
  )
}
