import type {
  AuthResponse,
  LoginCredentials,
  User,
  MatchesResponse,
  Bet,
  CreateBetPayload,
} from '@/types'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
})

// automatisches Hinzufügen des Tokens
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  console.log('apiclient token', token)
  console.log('api client config', config)
  return config
})

// wenn Sitzung abgelaufen ist dann redirect zum Login
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

// --- Auth ---
export const login = (credentials: LoginCredentials): Promise<AuthResponse> =>
  apiClient.post<AuthResponse>('/auth/login', credentials).then((res) => res.data)

// --- User ---
export const getMe = (): Promise<User> => apiClient.get<User>('auth/me').then((res) => res.data)

// --- Matches ---
export const getMatches = (): Promise<MatchesResponse> =>
  apiClient.get<MatchesResponse>('/matches/rounds').then((res) => res.data)

// --- Bets ---
export const getBets = (): Promise<Bet[]> => apiClient.get<Bet[]>('/bets/').then((res) => res.data)

export const placeBet = (payload: CreateBetPayload): Promise<Bet> =>
  apiClient.post<Bet>('/bets/', payload).then((res) => res.data)

export const deleteBet = (betId: string): Promise<void> =>
  apiClient.delete(`/bets/${betId}`).then((res) => res.data)
