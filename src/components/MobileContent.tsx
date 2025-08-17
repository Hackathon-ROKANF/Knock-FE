import { Routes, Route } from 'react-router-dom'

import FirstPage from '../pages/FirstPage'
import UploadPage from '../pages/UploadPage'
import LoadingPage from '../pages/LoadingPage'
import AddInfoPage from '../pages/AddInfoPage'
import ResultPage from '../pages/ResultPage'

export default function MobileContent() {
  return (
    <Routes>
      <Route
        path='/'
        element={<FirstPage />}
      />
      <Route
        path='/upload'
        element={<UploadPage />}
      />
      <Route
        path='/loading'
        element={<LoadingPage />}
      />
      <Route
        path='/addInfo'
        element={<AddInfoPage />}
      />
      <Route
        path='/result'
        element={<ResultPage />}
      />
    </Routes>
  )
}
