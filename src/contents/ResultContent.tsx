import { useDeedUploadStore } from '../store/useDeedUploadStore'

export default function ResultContent() {
  const { analysisResult } = useDeedUploadStore()

  // 분석 요약을 숫자별로 파싱하는 함수
  const parseAnalysisSummary = (summary: string) => {
    // 숫자로 시작하는 항목들을 찾기 위한 정규식
    const items = summary.split(/(\d+\.\s)/).filter((item) => item.trim() !== '')
    const parsedItems: Array<{ number: string; content: string; type: '위험' | '안전' | '주의' }> = []

    for (let i = 0; i < items.length - 1; i += 2) {
      const number = items[i]?.trim()
      const content = items[i + 1]?.trim()

      if (number && content && /^\d+\.$/.test(number)) {
        // 내용에 따라 타입 결정
        let type: '위험' | '안전' | '주의' = '주의'
        if (content.includes('위험 요인')) {
          type = '위험'
        } else if (content.includes('안전 요인')) {
          type = '안전'
        }

        parsedItems.push({
          number: number.replace('.', ''),
          content: content,
          type: type,
        })
      }
    }

    return parsedItems
  }

  const analysisItems = analysisResult ? parseAnalysisSummary(analysisResult.analysis_summary) : []

  // 실제 분석 결과가 있을 때만 내용을 표시
  if (!analysisResult) {
    return <div className='text-center text-gray-500'>분석 결과를 불러오는 중...</div>
  }

  return (
    <div className='space-y-6 w-full p-3'>
      {/* 최종 분석 결과 - 맨 위로 이동 */}
      <div>
        <h3 className='font-bold text-blue-600 mb-3 text-lg'>분석 결과</h3>
        <div className='text-mainfont'>
          <div className='mb-2'>
            <span className={`font-bold text-xl ${analysisResult.prediction === '안전' ? 'text-green-600' : analysisResult.prediction === '관심' ? 'text-blue-600' : analysisResult.prediction === '주의' ? 'text-yellow-600' : 'text-red-600'}`}>
              {analysisResult.prediction}
            </span>
            <span className='ml-3 text-gray-600'>위험도: {analysisResult.risk_probability}</span>
          </div>
        </div>
      </div>

      {/* 분석 요약 */}
      <div>
        <h3 className='font-bold text-blue-600 mb-3 text-lg'>분석 요약</h3>
        <div className='text-mainfont space-y-3'>
          {analysisItems.length > 0 ? (
            analysisItems.map((item, index) => (
              <div
                key={index}
                className='flex gap-3'>
                <div className='flex-shrink-0'>
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium text-white ${item.type === '위험' ? 'bg-red-500' : item.type === '안전' ? 'bg-green-500' : 'bg-yellow-500'}`}>{item.number}</span>
                </div>
                <div className='flex-1'>
                  <p className='leading-relaxed'>{item.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='leading-relaxed'>{analysisResult?.analysis_summary}</p>
          )}
        </div>
      </div>

      {/* 위험 요소 확인 */}
      <div>
        <h3 className='font-bold text-blue-600 mb-3 text-lg'>위험 요소</h3>
        <div className='text-mainfont space-y-2'>
          <div>
            <span className='font-medium text-gray-700'>근저당권 개수:</span> <span className='ml-2'>{analysisResult.all_features.근저당권_개수}</span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>압류/가압류 개수:</span> <span className='ml-2'>{analysisResult.all_features.압류_가압류_개수}</span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>신탁등기 여부:</span> <span className='ml-2'>{analysisResult.all_features.신탁_등기여부}</span>
          </div>
        </div>
      </div>

      {/* 부동산 정보 */}
      <div>
        <h3 className='font-bold text-blue-600 mb-3 text-lg'>부동산 정보</h3>
        <div className='text-mainfont space-y-2'>
          <div>
            <span className='font-medium text-gray-700'>주소:</span> <span className='ml-2'>{analysisResult.all_features.주소}</span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>건축물 유형:</span> <span className='ml-2'>{analysisResult.all_features.건축물_유형}</span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>매매가:</span> <span className='ml-2'>{analysisResult.all_features.매매가}</span>
          </div>
        </div>
      </div>

      {/* 전세 정보 */}
      <div>
        <h3 className='font-bold text-blue-600 mb-3 text-lg'>전세 정보</h3>
        <div className='text-mainfont space-y-2'>
          <div>
            <span className='font-medium text-gray-700'>전세가:</span> <span className='ml-2'>{analysisResult.all_features.전세가}</span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>전세가율:</span> <span className='ml-2'>{analysisResult.all_features.전세가율}</span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>전입 가능여부:</span> <span className='ml-2'>{analysisResult.all_features.전입_가능여부}</span>
          </div>
        </div>
      </div>

      {/* 채권 및 담보 정보 */}
      <div>
        <h3 className='font-bold text-blue-600 mb-3 text-lg'>채권 및 담보 정보</h3>
        <div className='text-mainfont space-y-2'>
          <div>
            <span className='font-medium text-gray-700'>선순위 채권 존재여부:</span> <span className='ml-2'>{analysisResult.all_features.선순위_채권_존재여부}</span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>우선변제권 여부:</span> <span className='ml-2'>{analysisResult.all_features.우선변제권_여부}</span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>채권 최고액:</span> <span className='ml-2'>{analysisResult.all_features.채권최고액}</span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>근저당권 설정일 (최근):</span> <span className='ml-2'>{analysisResult.all_features.근저당권_설정일_최근}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
