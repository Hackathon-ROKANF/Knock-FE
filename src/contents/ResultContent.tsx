import { useDeedUploadStore } from '../store/useDeedUploadStore'

export default function ResultContent() {
  const { analysisResult } = useDeedUploadStore()

  // 실제 분석 결과가 있을 때만 내용을 표시
  if (!analysisResult) {
    return <div className='text-center text-gray-500'>분석 결과를 불러오는 중...</div>
  }

  return (
    <div className='space-y-4 w-full'>
      <div className='bg-blue-50 rounded-lg p-4 min-h-[120px] flex flex-col'>
        <h3 className='font-semibold text-primary mb-2'>분석 요약</h3>
        <p className='text-mainfont flex-1'>{analysisResult.analysis_summary}</p>
      </div>

      <div className='bg-green-50 rounded-lg p-4 min-h-[100px] flex flex-col'>
        <h3 className='font-semibold text-green-600 mb-2'>부동산 정보</h3>
        <p className='text-mainfont flex-1'>
          <span className='font-medium'>주소:</span> {analysisResult.all_features.주소}
          <br />
          <span className='font-medium'>건축물 유형:</span> {analysisResult.all_features.건축물_유형}
          <br />
          <span className='font-medium'>매매가:</span> {analysisResult.all_features.매매가}
        </p>
      </div>

      <div className='bg-yellow-50 rounded-lg p-4 min-h-[100px] flex flex-col'>
        <h3 className='font-semibold text-yellow-600 mb-2'>전세 정보</h3>
        <p className='text-mainfont flex-1'>
          <span className='font-medium'>전세가:</span> {analysisResult.all_features.전세가}
          <br />
          <span className='font-medium'>전세가율:</span> {analysisResult.all_features.전세가율}
          <br />
          <span className='font-medium'>전입 가능여부:</span> {analysisResult.all_features.전입_가능여부}
        </p>
      </div>

      <div className='bg-red-50 rounded-lg p-4 min-h-[100px] flex flex-col'>
        <h3 className='font-semibold text-red-600 mb-2'>위험 요소 확인</h3>
        <p className='text-mainfont flex-1'>
          <span className='font-medium'>근저당권 개수:</span> {analysisResult.all_features.근저당권_개수}
          <br />
          <span className='font-medium'>압류/가압류 개수:</span> {analysisResult.all_features.압류_가압류_개수}
          <br />
          <span className='font-medium'>신탁등기 여부:</span> {analysisResult.all_features.신탁_등기여부}
        </p>
      </div>

      <div className='bg-purple-50 rounded-lg p-4 min-h-[80px] flex flex-col'>
        <h3 className='font-semibold text-purple-600 mb-2'>최종 분석 결과</h3>
        <p className='text-mainfont flex-1'>
          <span className={`font-bold ${analysisResult.prediction === '안전' ? 'text-green-600' : 'text-red-600'}`}>{analysisResult.prediction}</span>
          <span className='ml-2'>위험도: {analysisResult.risk_probability}</span>
        </p>
      </div>
    </div>
  )
}
