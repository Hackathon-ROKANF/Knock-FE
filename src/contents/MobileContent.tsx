import { Routes, Route } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import FirstPage from '../pages/FirstPage'
import UploadPage from '../pages/UploadPage'
import LoadingPage from '../pages/LoadingPage'
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
        path='/result'
        element={<ResultPage />}
      />
      <Route
        path='/*'
        element={<ErrorPage />}
      />
    </Routes>
  )
}
