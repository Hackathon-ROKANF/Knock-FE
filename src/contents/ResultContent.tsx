import { useDeedUploadStore } from '../store/useDeedUploadStore'

export default function ResultContent() {
  const { analysisResult } = useDeedUploadStore()

  const isAnalysisSummaryObject = (
    summary: unknown
  ): summary is {
    관심?: string
    주의?: string
    안전?: string
    위험?: string
    '안전 요인'?: string[]
    '위험 요인'?: string[]
  } => {
    return typeof summary === 'object' && summary !== null
  }

  if (!analysisResult) {
    return <div className='text-center text-gray-500'>분석 결과를 불러오는 중...</div>
  }

  return (
    <div className='space-y-6 w-full p-3 '>
      <div>
        <h3 className='font-bold text-primary mb-3 text-xl'>분석 결과</h3>
        <div className='text-mainfont'>
          <div className='mb-2 ml-1 flex items-center'>
            <span
              className={`inline-flex items-center justify-center w-3 h-3 rounded-full text-xs font-bold text-white mr-2 ${
                analysisResult.prediction === '안전' ? 'bg-green-600' : analysisResult.prediction === '관심' ? 'bg-blue-500' : analysisResult.prediction === '주의' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></span>
            <span className={`text-lg font-bold ${analysisResult.prediction === '안전' ? 'text-green-600' : analysisResult.prediction === '관심' ? 'text-blue-600' : analysisResult.prediction === '주의' ? 'text-yellow-600' : 'text-red-600'}`}>
              {analysisResult.prediction}
            </span>
            <span className='ml-3 text-gray-600'>위험도: {analysisResult.risk_probability}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className='font-bold text-primary mb-3 text-xl'>분석 요약</h3>
        <div className='text-mainfont space-y-4'>
          {isAnalysisSummaryObject(analysisResult.analysis_summary) ? (
            <>
              {analysisResult.analysis_summary.안전 && (
                <div className='bg-white border border-gray-200 p-4 rounded-lg shadow-md'>
                  <div className='flex items-center mb-2'>
                    <h4 className='font-semibold text-green-600'>안전</h4>
                  </div>
                  <p className='text-gray-700 leading-relaxed'>{analysisResult.analysis_summary.안전}</p>
                </div>
              )}

              {analysisResult.analysis_summary.관심 && (
                <div className='bg-white border border-gray-200 p-4 rounded-lg shadow-md'>
                  <div className='flex items-center mb-2'>
                    <h4 className='font-semibold text-blue-600'>관심</h4>
                  </div>
                  <p className='text-gray-700 leading-relaxed'>{analysisResult.analysis_summary.관심}</p>
                </div>
              )}

              {analysisResult.analysis_summary.주의 && (
                <div className='bg-white border border-gray-200 p-4 rounded-lg shadow-md'>
                  <div className='flex items-center mb-2'>
                    <h4 className='font-semibold text-yellow-600'>주의</h4>
                  </div>
                  <p className='text-gray-700 leading-relaxed'>{analysisResult.analysis_summary.주의}</p>
                </div>
              )}

              {analysisResult.analysis_summary.위험 && (
                <div className='bg-white border border-gray-200 p-4 rounded-lg shadow-md'>
                  <div className='flex items-center mb-2'>
                    <span className='inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium text-white bg-red-500 mr-2'></span>
                    <h4 className='font-semibold text-red-600'>위험</h4>
                  </div>
                  <p className='text-gray-700 leading-relaxed'>{analysisResult.analysis_summary.위험}</p>
                </div>
              )}

              {analysisResult.analysis_summary['위험 요인'] && (
                <div className='bg-white border border-gray-200 p-4 rounded-lg shadow-md'>
                  <div className='flex items-center mb-3'>
                    <h4 className='font-semibold text-red-600'>위험 요인</h4>
                  </div>
                  <ul className='space-y-2'>
                    {analysisResult.analysis_summary['위험 요인'].map((item: string, index: number) => (
                      <li
                        key={index}
                        className='text-gray-700 leading-relaxed flex items-start'>
                        <span className='w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0'></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisResult.analysis_summary['안전 요인'] && (
                <div className='bg-white border border-gray-200 p-4 rounded-lg shadow-md'>
                  <div className='flex items-center mb-3'>
                    <h4 className='font-semibold text-green-600'>안전 요인</h4>
                  </div>
                  <ul className='space-y-2'>
                    {analysisResult.analysis_summary['안전 요인'].map((item: string, index: number) => (
                      <li
                        key={index}
                        className='text-gray-700 leading-relaxed flex items-start'>
                        <span className='w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0'></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className='bg-white border border-gray-200 p-4 rounded-lg shadow-md'>
              <p className='text-gray-700 leading-relaxed'>{analysisResult.analysis_summary}</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className='font-bold text-primary mb-3 text-xl'>위험 요소</h3>
        <div className='text-mainfont space-y-2 ml-1 font-medium'>
          <div>
            <span className=' text-gray-700'>근저당권 개수:</span> <span className='ml-1'>{analysisResult.all_features.근저당권_개수} 개</span>
          </div>
          <div>
            <span className=' text-gray-700'>압류/가압류 개수:</span> <span className='ml-1'>{analysisResult.all_features.압류_가압류_개수} 개</span>
          </div>
          <div>
            <span className=' text-gray-700'>신탁등기:</span> <span className='ml-1'>{analysisResult.all_features.신탁_등기여부 === 'True' ? '있음' : '없음'}</span>
          </div>
          <div>
            <span className='text-gray-700'>전입 가능 여부:</span> <span className='ml-1'>{analysisResult.all_features.전입_가능여부 === 'True' ? '가능' : '불가능'}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className='font-bold text-primary mb-3 text-xl'>부동산 정보</h3>
        <div className='text-mainfont space-y-2 ml-1 font-medium'>
          <div>
            <span className='text-gray-700'>주소:</span> <span className='ml-1'>{analysisResult.all_features.주소}</span>
          </div>
          <div>
            <span className='text-gray-700'>건축물 유형:</span> <span className='ml-1'>{analysisResult.all_features.건축물_유형}</span>
          </div>

          <div>
            <span className='text-gray-700'>최근 매매가:</span> <span className='ml-1'>{analysisResult.all_features.과거_매매가 === 'None' ? '-' : Number(analysisResult.all_features.과거_매매가).toLocaleString('ko-KR') + ' 원'}</span>
          </div>
          <div>
            <span className='text-gray-700'>최근 전세가:</span> <span className='ml-1'>{analysisResult.all_features.과거_전세가 === 'None' ? '-' : Number(analysisResult.all_features.과거_전세가).toLocaleString('ko-KR') + ' 원'}</span>
          </div>
          <div>
            <span className='text-gray-700'>전세가율:</span> <span className='ml-1'>{analysisResult.all_features.과거_전세가율 === 'None' ? '-' : analysisResult.all_features.과거_전세가율}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className='font-bold text-blue-600 mb-3 text-xl'>채권 및 담보 정보</h3>
        <div className='text-mainfont space-y-2 ml-1 font-medium'>
          <div>
            <span className='text-gray-700'>선순위 채권:</span> <span className='ml-1'>{analysisResult.all_features.선순위_채권_존재여부 === 'True' ? '존재' : '없음'}</span>
          </div>
          <div>
            <span className='text-gray-700'>우선변제권:</span> <span className='ml-1'>{analysisResult.all_features.우선변제권_여부 === 'True' ? '있음' : '없음'}</span>
          </div>
          <div>
            <span className='text-gray-700'>채권 최고액:</span>
            <span className='ml-1'>{Number(analysisResult.all_features.채권최고액).toLocaleString('ko-KR') + ' 원'}</span>
          </div>
          <div>
            <span className=' text-gray-700'>최근 근저당권 설정일:</span> <span className='ml-1'>{analysisResult.all_features.근저당권_설정일_최근 === 'None' ? '없음' : analysisResult.all_features.근저당권_설정일_최근}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
