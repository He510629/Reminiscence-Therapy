import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { demoUser } from '../demo/data'

interface User {
  id: string
  phone: string
  name: string
  avatar: string
  role: string
  birth_year: number
  region: string
  cognitive_level: number
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoggedIn: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(demoUser)
  const [token, setToken] = useState<string | null>('demo-token')

  useEffect(() => {
    localStorage.setItem('token', 'demo-token')
    localStorage.setItem('user', JSON.stringify(demoUser))
  }, [])

  const login = (newToken: string, newUser: User) => {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const logout = () => {
    setToken('demo-token')
    setUser(demoUser)
    localStorage.setItem('token', 'demo-token')
    localStorage.setItem('user', JSON.stringify(demoUser))
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn: true, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
