import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { contentApi } from '../api'

interface ContentItem {
  id: string
  type: string
  title: string
  description: string
  media_url: string
  thumbnail_url: string
  era: string
  region: string
  theme_tags: string[]
  emotion_tag: string
  cognitive_level: number
  view_count: number
}

const ERA_OPTIONS = [
  { value: '', label: '全部年代' },
  { value: '1960s', label: '60年代' },
  { value: '1970s', label: '70年代' },
  { value: '1980s', label: '80年代' },
]

const EMOTION_OPTIONS = [
  { value: '', label: '全部情感' },
  { value: 'warm', label: '温暖' },
  { value: 'cheerful', label: '欢快' },
  { value: 'nostalgic', label: '怀旧' },
]

const TYPE_ICONS: Record<string, string> = {
  photo: '📷',
  audio: '🎵',
  video: '🎞',
}

function getCardImage(item: ContentItem) {
  return item.thumbnail_url || item.media_url || ''
}

export default function MuseumPage() {
  const navigate = useNavigate()
  const [contents, setContents] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'recommend' | 'all'>('recommend')
  const [eraFilter, setEraFilter] = useState('')
  const [emotionFilter, setEmotionFilter] = useState('')

  useEffect(() => {
    loadData()
  }, [activeTab, eraFilter, emotionFilter])

  const loadData = async () => {
    setLoading(true)
    try {
      const params: any = {}
      if (eraFilter) params.era = eraFilter
      if (emotionFilter) params.emotion_tag = emotionFilter

      const res = activeTab === 'recommend'
        ? await contentApi.recommend({ ...params, limit: 20 })
        : await contentApi.list({ ...params, page_size: 20 })

      const data = res.data
      setContents(data.items || data || [])
    } catch (err) {
      console.error('加载内容失败', err)
    } finally {
      setLoading(false)
    }
  }

  const emotionLabel: Record<string, string> = {
    warm: '温暖',
    cheerful: '欢快',
    nostalgic: '怀旧',
  }

  return (
    <div className="fade-in">
      <div className="section-title">🏛️ 怀旧策展馆</div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          className={activeTab === 'recommend' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveTab('recommend')}
          style={{ flex: 1, fontSize: '24px' }}
        >
          为您推荐
        </button>
        <button
          className={activeTab === 'all' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveTab('all')}
          style={{ flex: 1, fontSize: '24px' }}
        >
          全部内容
        </button>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {ERA_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`tag tag-era ${eraFilter === opt.value ? 'active' : ''}`}
            onClick={() => setEraFilter(opt.value)}
            style={{
              fontSize: '22px',
              padding: '10px 20px',
              background: eraFilter === opt.value ? '#C7522A' : 'rgba(199,82,42,0.1)',
              color: eraFilter === opt.value ? '#fff' : '#C7522A',
              borderRadius: '999px',
              border: 'none',
              minHeight: '48px',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {EMOTION_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setEmotionFilter(opt.value)}
            style={{
              fontSize: '22px',
              padding: '10px 20px',
              background: emotionFilter === opt.value ? '#4CAF50' : 'rgba(76,175,80,0.1)',
              color: emotionFilter === opt.value ? '#fff' : '#4CAF50',
              borderRadius: '999px',
              border: 'none',
              minHeight: '48px',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-spinner" />
      ) : contents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <div className="empty-text">暂无内容，敬请期待</div>
        </div>
      ) : (
        <div className="grid-2">
          {contents.map((item) => {
            const cardImage = getCardImage(item)
            return (
              <div
                key={item.id}
                className="card card-hover"
                onClick={() => navigate(`/museum/${item.id}`)}
                style={{ cursor: 'pointer', padding: '16px' }}
              >
                {cardImage ? (
                  <img
                    src={cardImage}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '160px',
                      objectFit: 'cover',
                      borderRadius: '16px',
                      marginBottom: '12px',
                      display: 'block',
                      background: '#F5E6D3',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '160px',
                      background: 'linear-gradient(135deg, #F5E6D3, #E8D5BE)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '64px',
                      marginBottom: '12px',
                    }}
                  >
                    {TYPE_ICONS[item.type] || '📷'}
                  </div>
                )}

                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '22px',
                    color: '#8B7355',
                    marginBottom: '12px',
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.description}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="tag tag-era">{item.era}</span>
                  <span className="tag tag-emotion">{emotionLabel[item.emotion_tag] || item.emotion_tag}</span>
                  {item.theme_tags?.slice(0, 2).map((tag, i) => (
                    <span key={i} className="tag tag-theme">{tag}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
