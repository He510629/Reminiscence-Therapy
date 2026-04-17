import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gameApi } from '../api'

interface GameItem {
  id: string
  name: string
  code: string
  description: string
  cognitive_domain: string
  nostalgia_element: string
}

interface DailyGame {
  game: GameItem
  recommended_difficulty: number
  reason: string
}

const DOMAIN_LABELS: Record<string, string> = {
  memory: '🧠 记忆力',
  language: '🗣️ 语言能力',
  spatial: '🧭 空间定向',
  semantic: '📖 语义记忆',
}

const GAME_ICONS: Record<string, string> = {
  object_match: '🏺',
  opera_melody: '🎭',
  map_connect: '🗺️',
}

export default function GamePage() {
  const navigate = useNavigate()
  const [games, setGames] = useState<GameItem[]>([])
  const [dailyGame, setDailyGame] = useState<DailyGame | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [gamesRes, dailyRes] = await Promise.allSettled([
        gameApi.list(),
        gameApi.daily(),
      ])
      if (gamesRes.status === 'fulfilled') {
        setGames(gamesRes.value.data || [])
      }
      if (dailyRes.status === 'fulfilled') {
        setDailyGame(dailyRes.value.data)
      }
    } catch (err) {
      console.error('加载游戏失败', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading-spinner" />

  return (
    <div className="fade-in">
      <div className="section-title">🎮 趣味健脑营</div>

      {dailyGame && (
        <div
          className="card"
          style={{
            marginBottom: '32px',
            background: 'linear-gradient(135deg, #C7522A, #A03E1E)',
            color: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => navigate(`/game/play/${dailyGame.game.code}`)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
            <span style={{ fontSize: '64px' }}>{GAME_ICONS[dailyGame.game.code] || '🎮'}</span>
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: 700 }}>今日推荐</h2>
              <p style={{ fontSize: '24px', opacity: 0.9 }}>{dailyGame.reason}</p>
            </div>
          </div>
          <h3 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
            {dailyGame.game.name}
          </h3>
          <p style={{ fontSize: '24px', opacity: 0.85 }}>{dailyGame.game.description}</p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '999px', fontSize: '22px' }}>
              推荐难度：{'⭐'.repeat(dailyGame.recommended_difficulty)}
            </span>
          </div>
        </div>
      )}

      <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '20px' }}>全部游戏</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {games.map(game => (
          <div
            key={game.id}
            className="card card-hover"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/game/play/${game.code}`)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontSize: '56px' }}>{GAME_ICONS[game.code] || '🎮'}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '30px', fontWeight: 700, marginBottom: '8px' }}>{game.name}</h3>
                <p style={{ fontSize: '24px', color: '#8B7355', marginBottom: '8px' }}>{game.description}</p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <span className="tag tag-era">{DOMAIN_LABELS[game.cognitive_domain] || game.cognitive_domain}</span>
                  <span className="tag tag-theme">{game.nostalgia_element}</span>
                </div>
              </div>
              <span style={{ fontSize: '36px', color: '#C7522A' }}>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
