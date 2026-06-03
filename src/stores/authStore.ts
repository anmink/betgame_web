import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials } from '@/types'
import { login } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const user = ref<User | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const isLoggedIn = computed<boolean>(() => token.value !== null)

  async function loginUser(credentials: LoginCredentials): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const data = await login(credentials)
      token.value = data.access_token
      localStorage.setItem('auth_token', data.access_token)
      user.value = data.user
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Login fehlgeschlagen'
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function logout(): void {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
  }

  return { token, user, isLoading, error, isLoggedIn, loginUser, logout }
})
