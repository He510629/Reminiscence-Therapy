import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { contentApi } from '../api'

interface StoryImage {
  title: string
  era: string
  image_url: string
  source_label: string
  source_url: string
}

interface StorySection {
  era: string
  title: string
  image_url: string
  source_label: string
  source_url: string
  body: string
}

interface ContentDetail {
  id: string
  type: string
  title: string
  description: string
  media_url: string
  cover_image_url?: string
  gallery?: StoryImage[]
  story_sections?: StorySection[]
  era: string
  region: string
  theme_tags: string[]
  emotion_tag: string
  voice_over_url: string
  view_count: number
}

function getSpeakText(content: ContentDetail) {
  const storyText = content.story_sections
    ?.map((section) => `${section.era}，${section.body}`)
    .join('。')
  return storyText || `${content.title}。${content.description}`
}

export default function ContentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [content, setContent] = useState<ContentDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    if (id) {
      loadContent()
    }
  }, [id])

  const loadContent = async () => {
    try {
      const res = await contentApi.detail(id!)
      setContent(res.data)
    } catch (err) {
      console.error('加载内容失败', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSpeak = () => {
    if (!content) return
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(getSpeakText(content))
    utterance.lang = 'zh-CN'
    utterance.rate = 0.8
    utterance.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
  }

  const emotionLabel: Record<string, string> = {
    warm: '温暖',
    cheerful: '欢快',
    nostalgic: '怀旧',
  }

  if (loading) return <div className="loading-spinner" />
  if (!content) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <div className="empty-text">内容不存在</div>
      </div>
    )
  }

  const heroImage = content.cover_image_url || content.media_url

  return (
    <div className="fade-in">
      <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '24px', fontSize: '24px' }}>
        ← 返回
      </button>

      <div className="card" style={{ marginBottom: '24px' }}>
        {heroImage ? (
          <img
            src={heroImage}
            alt={content.title}
            style={{
              width: '100%',
              minHeight: '320px',
              objectFit: 'cover',
              borderRadius: '20px',
              marginBottom: '24px',
              background: '#F5E6D3',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              minHeight: '300px',
              background: 'linear-gradient(135deg, #F5E6D3, #E8D5BE)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '120px',
              marginBottom: '24px',
            }}
          >
            {content.type === 'audio' ? '🎵' : content.type === 'video' ? '🎞' : '📷'}
          </div>
        )}

        <h1 style={{ fontSize: '40px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.3 }}>
          {content.title}
        </h1>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span className="tag tag-era">{content.era}</span>
          <span className="tag tag-emotion">{emotionLabel[content.emotion_tag] || content.emotion_tag}</span>
          <span className="tag tag-theme">{content.region}</span>
          {content.theme_tags?.map((tag, i) => (
            <span key={i} className="tag tag-theme">{tag}</span>
          ))}
        </div>

        <p style={{ fontSize: '28px', lineHeight: 1.8, color: '#3D2B1F', marginBottom: '28px' }}>
          {content.description}
        </p>

        {content.gallery && content.gallery.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '30px', marginBottom: '16px', color: '#3D2B1F' }}>钟楼影像</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {content.gallery.map((image, index) => (
                <div key={`${image.image_url}-${index}`} style={{ background: '#FFF8F0', borderRadius: '18px', padding: '12px' }}>
                  <img
                    src={image.image_url}
                    alt={image.title}
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '14px', display: 'block', marginBottom: '10px' }}
                  />
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#3D2B1F', marginBottom: '4px' }}>{image.title}</div>
                  <div style={{ fontSize: '18px', color: '#8B7355', marginBottom: image.source_url ? '6px' : 0 }}>{image.era}</div>
                  {image.source_url && (
                    <a href={image.source_url} target="_blank" rel="noreferrer" style={{ fontSize: '16px', color: '#C7522A' }}>
                      来源：{image.source_label || '查看图片'}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {content.story_sections && content.story_sections.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '28px' }}>
            {content.story_sections.map((section, index) => (
              <section key={`${section.era}-${index}`} style={{ padding: '24px', borderRadius: '20px', background: '#FFF8F0' }}>
                <div style={{ fontSize: '18px', color: '#C7522A', marginBottom: '8px', fontWeight: 700 }}>{section.era}</div>
                <h2 style={{ fontSize: '30px', lineHeight: 1.4, marginBottom: '16px', color: '#3D2B1F' }}>{section.title}</h2>
                {section.image_url && (
                  <img
                    src={section.image_url}
                    alt={section.title}
                    style={{ width: '100%', maxHeight: '340px', objectFit: 'cover', borderRadius: '18px', display: 'block', marginBottom: '14px' }}
                  />
                )}
                <p style={{ fontSize: '25px', lineHeight: 1.9, color: '#3D2B1F', whiteSpace: 'pre-wrap', marginBottom: section.source_url ? '10px' : 0 }}>
                  {section.body}
                </p>
                {section.source_url && (
                  <a href={section.source_url} target="_blank" rel="noreferrer" style={{ fontSize: '16px', color: '#C7522A' }}>
                    图片来源：{section.source_label || '查看原图'}
                  </a>
                )}
              </section>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '28px', lineHeight: 1.8, color: '#3D2B1F', marginBottom: '24px' }}>
            {content.description}
          </p>
        )}

        <button
          onClick={handleSpeak}
          className="btn btn-primary btn-lg"
          style={{ width: '100%', fontSize: '28px' }}
        >
          {speaking ? '暂停朗读' : '朗读这段回忆'}
        </button>
      </div>
    </div>
  )
}
