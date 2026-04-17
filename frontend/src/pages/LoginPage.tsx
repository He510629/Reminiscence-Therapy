import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { authApi } from '../api'

interface LoginPageProps {
  onSwitchToRegister: () => void
}

export default function LoginPage({ onSwitchToRegister }: LoginPageProps) {
  const { login } = useAuth()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!phone || phone.length !== 11) {
      setError('请输入11位手机号')
      return
    }
    if (!password || password.length < 6) {
      setError('密码至少6位')
      return
    }
    setLoading(true)
    try {
      const res = await authApi.login(phone, password)
      const data = res.data
      login(data.access_token, {
        id: data.user_id,
        name: data.name,
        phone,
        avatar: '',
        role: data.role,
        birth_year: 1950,
        region: '碑林区',
        cognitive_level: 1,
      })
    } catch (err: any) {
      setError(err.message || '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      background: 'linear-gradient(180deg, #FFF8F0 0%, #F5E6D3 100%)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>🏛️</div>
        <h1 style={{ fontSize: '48px', color: '#C7522A', fontWeight: 700 }}>认知陪伴</h1>
        <p style={{ fontSize: '24px', color: '#8B7355', marginTop: '8px' }}>本土化怀旧数字陪伴系统</p>
      </div>

      <form onSubmit={handleSubmit} style={{
        width: '100%',
        maxWidth: '480px',
        background: '#fff',
        borderRadius: '24px',
        padding: '48px',
        boxShadow: '0 4px 16px rgba(61,43,31,0.12)',
      }}>
        <h2 style={{ fontSize: '36px', marginBottom: '32px', textAlign: 'center', color: '#3D2B1F' }}>
          欢迎回来
        </h2>

        {error && (
          <div style={{
            background: '#FFF3F3',
            color: '#F44336',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '24px',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '28px', marginBottom: '8px', fontWeight: 600 }}>
            手机号
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="请输入手机号"
            maxLength={11}
            style={{ fontSize: '28px', padding: '20px', minHeight: '72px' }}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontSize: '28px', marginBottom: '8px', fontWeight: 600 }}>
            密码
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
            style={{ fontSize: '28px', padding: '20px', minHeight: '72px' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary btn-block btn-lg"
          style={{ marginBottom: '24px' }}
        >
          {loading ? '登录中...' : '登 录'}
        </button>

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={onSwitchToRegister}
            style={{ color: '#C7522A', fontSize: '24px', minHeight: 'auto', minWidth: 'auto' }}
          >
            还没有账号？点击注册
          </button>
        </div>

        <div style={{
          marginTop: '32px',
          padding: '20px',
          background: '#FFF8F0',
          borderRadius: '12px',
          fontSize: '20px',
          color: '#8B7355',
          textAlign: 'center',
        }}>
          体验账号：13800000001 / 123456
        </div>
      </form>
    </div>
  )
}
