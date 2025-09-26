import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 미리 번들링할 의존성
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'swiper']
  },
  build: {
    // 번들 크기 최적화
    rollupOptions: {
      output: {
        manualChunks: {
          // 벤더 라이브러리 분리
          vendor: ['react', 'react-dom'],
          // UI 라이브러리 분리
          ui: ['framer-motion', 'swiper'],
          // 상태 관리 분리
          store: ['@tanstack/react-query', 'zustand']
        }
      }
    },
    // CSS 코드 스플리팅 활성화
    cssCodeSplit: true,
    // 최소화 옵션
    minify: 'esbuild',
    // 청크 크기 경고 임계값 조정
    chunkSizeWarningLimit: 1000
  }
})
