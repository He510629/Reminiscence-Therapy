import {
  demoContents,
  demoReports,
  demoUser,
  featuredTitles,
  getDemoChatReply,
} from '../demo/data'
import { demoDailyGame, demoGameSessions, demoGames } from '../demo/gameData'

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

function resolve<T>(data: T, message = 'success'): Promise<ApiResponse<T>> {
  return Promise.resolve({ code: 200, message, data })
}

function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T
}

function sortFeaturedFirst<T extends { title: string }>(items: T[]) {
  const order = new Map(featuredTitles.map((title, index) => [title, index]))
  return [...items].sort((a, b) => (order.get(a.title) ?? 999) - (order.get(b.title) ?? 999))
}

function filterContents(params?: { era?: string; region?: string; emotion_tag?: string; type?: string }) {
  let items = [...demoContents]
  if (params?.era) items = items.filter(item => item.era === params.era)
  if (params?.region) items = items.filter(item => item.region === params.region)
  if (params?.emotion_tag) items = items.filter(item => item.emotion_tag === params.emotion_tag)
  if (params?.type) items = items.filter(item => item.type === params.type)
  return sortFeaturedFirst(items)
}

export const authApi = {
  login: (_phone?: string, _password?: string) => resolve({
    access_token: 'demo-token',
    token_type: 'bearer',
    user: clone(demoUser),
    user_id: demoUser.id,
    name: demoUser.name,
    role: demoUser.role,
  }),
  register: (_data?: { phone: string; password: string; name: string; role?: string; birth_year?: number; region?: string }) => resolve({
    access_token: 'demo-token',
    token_type: 'bearer',
    user: clone(demoUser),
  }),
  getProfile: () => resolve(clone(demoUser)),
  updateProfile: (data: any) => resolve({ ...clone(demoUser), ...data }),
}

export const contentApi = {
  recommend: (params?: { limit?: number; era?: string; region?: string; emotion_tag?: string }) => {
    const items = filterContents(params).slice(0, params?.limit ?? 10)
    return resolve(clone(items))
  },
  list: (params?: { era?: string; region?: string; emotion_tag?: string; type?: string; page?: number; page_size?: number }) => {
    const allItems = filterContents(params)
    const page = params?.page ?? 1
    const pageSize = params?.page_size ?? 20
    const pagedItems = allItems.slice((page - 1) * pageSize, page * pageSize)
    return resolve({
      total: allItems.length,
      items: clone(pagedItems),
    })
  },
  detail: (id: string) => {
    const item = demoContents.find(content => content.id === id)
    if (!item) {
      return Promise.reject(new Error('内容不存在'))
    }
    return resolve(clone(item))
  },
  upload: () => Promise.reject(new Error('静态演示版暂不支持上传内容')),
}

export const gameApi = {
  list: () => resolve(clone(demoGames)),
  daily: () => resolve(clone(demoDailyGame)),
  session: (gameCode: string, difficulty: number = 1) => {
    const session = demoGameSessions[gameCode]
    if (!session) {
      return Promise.reject(new Error('游戏不存在'))
    }
    return resolve({
      game_id: gameCode,
      difficulty,
      questions: clone(session.questions),
    })
  },
  submitResult: (data: { game_id: string; difficulty: number; score: number; accuracy: number; reaction_time_ms?: number; duration_seconds?: number; detail?: any }) =>
    resolve({
      id: `result-${Date.now()}`,
      ...data,
      saved: false,
      note: '静态演示版不会保存成绩，但页面会正常展示结果。',
    }),
  history: () => resolve([]),
}

export const chatApi = {
  send: (message: string) => resolve(getDemoChatReply(message)),
}

export const reportApi = {
  weekly: () => resolve(clone(demoReports[0])),
  generateWeekly: () => resolve(clone(demoReports[0]), '演示报告已刷新'),
  list: (params?: { report_type?: string; limit?: number }) => {
    let items = [...demoReports]
    if (params?.report_type) items = items.filter(item => item.report_type === params.report_type)
    if (params?.limit) items = items.slice(0, params.limit)
    return resolve(clone(items))
  },
}

const api = {
  isDemo: true,
}

export default api
