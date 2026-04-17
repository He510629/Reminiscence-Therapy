import axios from 'axios'

const api = axios.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.code && data.code !== 200) {
      return Promise.reject(new Error(data.message || '请求失败'))
    }
    return data
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    const msg = error.response?.data?.detail || error.message || '网络错误'
    return Promise.reject(new Error(msg))
  }
)

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export const authApi = {
  login: (phone: string, password: string) =>
    api.post<ApiResponse>('/api/v1/auth/login', { phone, password }),
  register: (data: { phone: string; password: string; name: string; role?: string; birth_year?: number; region?: string }) =>
    api.post<ApiResponse>('/api/v1/auth/register', data),
  getProfile: () =>
    api.get<ApiResponse>('/api/v1/auth/profile'),
  updateProfile: (data: any) =>
    api.put<ApiResponse>('/api/v1/auth/profile', data),
}

export const contentApi = {
  recommend: (params?: { limit?: number; era?: string; region?: string; emotion_tag?: string }) =>
    api.get<ApiResponse>('/api/v1/content/recommend', { params }),
  list: (params?: { era?: string; region?: string; emotion_tag?: string; type?: string; page?: number; page_size?: number }) =>
    api.get<ApiResponse>('/api/v1/content/list', { params }),
  detail: (id: string) =>
    api.get<ApiResponse>(`/api/v1/content/${id}`),
  upload: (formData: FormData) =>
    api.post<ApiResponse>('/api/v1/content/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}

export const gameApi = {
  list: () =>
    api.get<ApiResponse>('/api/v1/game/list'),
  daily: () =>
    api.get<ApiResponse>('/api/v1/game/daily'),
  session: (gameCode: string, difficulty: number = 1) =>
    api.get<ApiResponse>(`/api/v1/game/session/${gameCode}`, { params: { difficulty } }),
  submitResult: (data: { game_id: string; difficulty: number; score: number; accuracy: number; reaction_time_ms?: number; duration_seconds?: number; detail?: any }) =>
    api.post<ApiResponse>('/api/v1/game/result', data),
  history: (params?: { game_id?: string; limit?: number }) =>
    api.get<ApiResponse>('/api/v1/game/history', { params }),
}

export const chatApi = {
  send: (message: string, context?: string) =>
    api.post<ApiResponse>('/api/v1/chat/send', { message, context }),
}

export const reportApi = {
  weekly: () =>
    api.get<ApiResponse>('/api/v1/report/weekly'),
  generateWeekly: () =>
    api.post<ApiResponse>('/api/v1/report/weekly/generate'),
  list: (params?: { report_type?: string; limit?: number }) =>
    api.get<ApiResponse>('/api/v1/report/list', { params }),
}

export default api
