import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDeedUploadStore } from '../store/useDeedUploadStore'
import { useUploadDeed } from '../hooks/useUploadDeed'
import PdfDropbox from '../components/PdfDropbox'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import UploadQuestionButton from '../components/UploadQuestionButton'
import MyPageButton from '../components/MyPageButton'
import samplePdf from '../assets/sample.pdf'

export default function UploadPage() {
  const navigate = useNavigate()
  const { file, error, isAnalyzing } = useDeedUploadStore()
  const uploadMutation = useUploadDeed()

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  // useEffect(() => {
  //   if (!token || !isAuthenticated) {
  //     console.log('토큰이 없습니다. 로그인 페이지로 이동합니다.')
  //     navigate('/login')
  //     return
  //   }
  // }, [token, isAuthenticated, navigate])

  const isValid = file && !error

  const handleProceed = async () => {
    if (!file || isAnalyzing) return

    const { clear } = useDeedUploadStore.getState()
    clear()

    try {
      navigate('/loading')
      uploadMutation.mutate(file)
    } catch {
      // Navigate to a generic error page
    }
  }

  const downloadSampleDeed = () => {
    // 샘플 PDF 파일 다운로드
    const link = document.createElement('a')
    link.href = samplePdf
    link.download = '샘플_등기부등본.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className='container h-screen flex flex-col p-6 relative'>
      <div className='absolute top-4 right-4 z-10 flex items-center gap-5'>
        <MyPageButton />
        <UploadQuestionButton />
      </div>

      <div className='flex-[9]'>
        <PageHeader title='등기부등본을 첨부해주세요' />

        <motion.div
          className='mb-5'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}>
          <PdfDropbox maxSizeMb={10} />
        </motion.div>

        <motion.div
          id='upload-help'
          className='space-y-2'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}>
          <p className='text-xs leading-tight text-red-500 text-center '>* 말소사항 포함으로 발급받으면 더욱 정확한 분석이 가능해요</p>
          <p className='text-xs leading-tight text-red-500 text-center'>* 업로드된 파일은 24시간 내 자동 삭제돼요</p>
        </motion.div>
      </div>

      <motion.div
        className='flex-[1] flex flex-col'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}>
        <Button
          onClick={downloadSampleDeed}
          variant='secondary'
          className='mb-2'>
          샘플 등기부등본 다운받기
        </Button>
        <Button
          onClick={handleProceed}
          disabled={!isValid || isAnalyzing}
          loading={isAnalyzing}
          variant='primary'>
          다음
        </Button>
      </motion.div>
    </div>
  )
}
