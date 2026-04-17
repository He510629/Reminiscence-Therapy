import React, { useState } from 'react'
import { authApi } from '../api'

interface RegisterPageProps {
  onSwitchToLogin: () => void
}

export default function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const [form, setForm] = useState({
    phone: '',
    password: '',
    name: '',
    role: 'elder',
    birth_year: 1950,
    region: '碑林区',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.phone || form.phone.length !== 11) {
      setError('请输入11位手机号')
      return
    }
    if (!form.password || form.password.length < 6) {
      setError('密码至少6位')
      return
    }
    if (!form.name) {
      setError('请输入姓名')
      return
    }
    setLoading(true)
    try {
      await authApi.register(form)
      onSwitchToLogin()
    } catch (err: any) {
      setError(err.message || '注册失败')
    } finally {
      setLoading(false)
    }
  }

  const updateForm = (key: string, value: string | number) => {
    setForm(prev => ({ ...prev, [key]: value }))
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
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '64px', marginBottom: '12px' }}>🏛️</div>
        <h1 style={{ fontSize: '40px', color: '#C7522A', fontWeight: 700 }}>注册账号</h1>
      </div>

      <form onSubmit={handleSubmit} style={{
        width: '100%',
        maxWidth: '480px',
        background: '#fff',
        borderRadius: '24px',
        padding: '48px',
        boxShadow: '0 4px 16px rgba(61,43,31,0.12)',
      }}>
        {error && (
          <div style={{
            background: '#FFF3F3', color: '#F44336', padding: '16px',
            borderRadius: '12px', marginBottom: '24px', fontSize: '24px', textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '28px', marginBottom: '8px', fontWeight: 600 }}>姓名</label>
          <input value={form.name} onChange={e => updateForm('name', e.target.value)} placeholder="请输入姓名" style={{ fontSize: '28px', padding: '20px', minHeight: '72px' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '28px', marginBottom: '8px', fontWeight: 600 }}>手机号</label>
          <input type="tel" value={form.phone} onChange={e => updateForm('phone', e.target.value)} placeholder="请输入手机号" maxLength={11} style={{ fontSize: '28px', padding: '20px', minHeight: '72px' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '28px', marginBottom: '8px', fontWeight: 600 }}>密码</label>
          <input type="password" value={form.password} onChange={e => updateForm('password', e.target.value)} placeholder="至少6位密码" style={{ fontSize: '28px', padding: '20px', minHeight: '72px' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '28px', marginBottom: '8px', fontWeight: 600 }}>我是</label>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { value: 'elder', label: '👴 老人' },
              { value: 'family', label: '👨‍👩‍👧 家属' },
            ].map(item => (
              <button
                key={item.value}
                type="button"
                onClick={() => updateForm('role', item.value)}
                className={form.role === item.value ? 'btn btn-primary' : 'btn btn-outline'}
                style={{ flex: 1, fontSize: '24px' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '28px', marginBottom: '8px', fontWeight: 600 }}>出生年份</label>
          <input type="number" value={form.birth_year} onChange={e => updateForm('birth_year', parseInt(e.target.value) || 1950)} style={{ fontSize: '28px', padding: '20px', minHeight: '72px' }} />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontSize: '28px', marginBottom: '8px', fontWeight: 600 }}>所在区域</label>
          <select
            value={form.region}
            onChange={e => updateForm('region', e.target.value)}
            style={{ fontSize: '28px', padding: '20px', minHeight: '72px', width: '100%', borderRadius: '12px', border: '2px solid #E8D5BE' }}
          >
            {['碑林区', '莲湖区', '新城区', '雁塔区', '未央区', '灞桥区', '长安区', '临潼区'].map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary btn-block btn-lg" style={{ marginBottom: '24px' }}>
          {loading ? '注册中...' : '注 册'}
        </button>

        <div style={{ textAlign: 'center' }}>
          <button type="button" onClick={onSwitchToLogin} style={{ color: '#C7522A', fontSize: '24px', minHeight: 'auto', minWidth: 'auto' }}>
            已有账号？点击登录
          </button>
        </div>
      </form>
    </div>
  )
}
