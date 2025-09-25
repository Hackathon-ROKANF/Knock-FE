import { Routes, Route } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import FirstPage from '../pages/FirstPage'
import LoginPage from '../pages/LoginPage'
import AuthSuccessPage from '../pages/AuthSuccessPage'
import UploadPage from '../pages/UploadPage'
import LoadingPage from '../pages/LoadingPage'
import ResultPage from '../pages/ResultPage'
import ExpertPage from '../pages/ExpertPage'
import PaymentPage from '../pages/PaymentPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path='/'
        element={<FirstPage />}
      />
      <Route
        path='/login'
        element={<LoginPage />}
      />

      <Route
        path='/auth/success'
        element={<AuthSuccessPage />}
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
        path='/expert'
        element={<ExpertPage />}
      />
      <Route
        path='/payment'
        element={<PaymentPage />}
      />
      <Route
        path='/*'
        element={<ErrorPage />}
      />
    </Routes>
  )
}
