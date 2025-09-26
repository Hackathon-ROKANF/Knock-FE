import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  nickname?: string
  profileImage?: string
  // 추가로 필요한 사용자 정보가 있다면 여기에 추가
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
}

interface AuthActions {
  setToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
  clearAuth: () => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setToken: (token) => {
        console.log('Auth Store - 토큰 설정:', token)
        set({
          token,
          isAuthenticated: true,
        })
      },

      setUser: (user) => set({ user }),

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        })
        // localStorage에서도 제거
        localStorage.removeItem('auth-storage')
      },

      clearAuth: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        })
        localStorage.removeItem('auth-storage')
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
