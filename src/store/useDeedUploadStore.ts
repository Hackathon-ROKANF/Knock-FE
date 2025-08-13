import { create } from 'zustand'

interface DeedUploadState {
  file: File | null
  error: string | null
  progress: number
  uploadId: string | null
}

interface DeedUploadActions {
  setFile: (file: File | null) => void
  clear: () => void
  setError: (msg: string | null) => void
  setProgress: (progress: number) => void
  setUploadId: (id: string | null) => void
}

type DeedUploadStore = DeedUploadState & DeedUploadActions

export const useDeedUploadStore = create<DeedUploadStore>((set) => ({
  // State
  file: null,
  error: null,
  progress: 0,
  uploadId: null,

  // Actions
  setFile: (file) => set({ file, error: null }),
  clear: () => set({ file: null, error: null, progress: 0, uploadId: null }),
  setError: (error) => set({ error }),
  setProgress: (progress) => set({ progress }),
  setUploadId: (uploadId) => set({ uploadId }),
}))
