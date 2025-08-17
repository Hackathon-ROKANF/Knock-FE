import { create } from 'zustand'

interface PageStepState {
  currentStep: number
  totalSteps: number
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  resetStep: () => void
}

export const usePageStepStore = create<PageStepState>((set, get) => ({
  currentStep: 1,
  totalSteps: 3,
  setCurrentStep: (step: number) => set({ currentStep: step }),
  nextStep: () => {
    const { currentStep, totalSteps } = get()
    if (currentStep < totalSteps) {
      set({ currentStep: currentStep + 1 })
    }
  },
  prevStep: () => {
    const { currentStep } = get()
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 })
    }
  },
  resetStep: () => set({ currentStep: 1 }),
}))
