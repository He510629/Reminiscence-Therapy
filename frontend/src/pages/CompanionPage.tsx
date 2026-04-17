import React, { useState, useRef, useEffect } from 'react'
import { chatApi } from '../api'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  emotion?: string
  suggestions?: string[]
}

export default function CompanionPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '你好呀！我是你的数字陪伴官，有啥想聊的尽管说！咱可以聊聊西安的老故事，也可以说说心里话。😊',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setLoading(true)

    try {
      const res = await chatApi.send(text)
      const data = res.data
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply,
        emotion: data.emotion_detected,
        suggestions: data.suggestions,
      }])
    } catch (err: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '抱歉，我暂时无法回复，请稍后再试。',
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleSpeak = (text: string) => {
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.8
    utterance.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
  }

  const quickReplies = [
    '你好呀',
    '聊聊西安',
    '想听秦腔',
    '以前的日子',
    '今天心情不好',
  ]

  const emotionEmoji: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    anxious: '😰',
    neutral: '🙂',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)' }}>
      <div className="section-title">💬 数字陪伴官</div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="fade-in"
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={{
              maxWidth: '80%',
              padding: '20px 28px',
              borderRadius: msg.role === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #C7522A, #A03E1E)'
                : '#FFFFFF',
              color: msg.role === 'user' ? '#fff' : '#3D2B1F',
              boxShadow: '0 2px 8px rgba(61,43,31,0.08)',
              fontSize: '26px',
              lineHeight: 1.6,
              position: 'relative',
            }}>
              {msg.role === 'assistant' && msg.emotion && (
                <span style={{ marginRight: '8px' }}>{emotionEmoji[msg.emotion] || '🙂'}</span>
              )}
              {msg.content}
              {msg.role === 'assistant' && (
                <button
                  onClick={() => handleSpeak(msg.content)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    fontSize: '20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    opacity: 0.5,
                    minHeight: 'auto',
                    minWidth: 'auto',
                    padding: '4px',
                  }}
                >
                  {speaking ? '🔇' : '🔊'}
                </button>
              )}
              {msg.role === 'assistant' && msg.suggestions && msg.suggestions.length > 0 && (
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {msg.suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(s)
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '999px',
                        background: 'rgba(199,82,42,0.1)',
                        color: '#C7522A',
                        fontSize: '20px',
                        border: '1px solid rgba(199,82,42,0.2)',
                        minHeight: '40px',
                        minWidth: 'auto',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '20px 28px',
              borderRadius: '24px 24px 24px 4px',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(61,43,31,0.08)',
              fontSize: '26px',
              color: '#8B7355',
            }}>
              正在思考中...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '12px 0', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {quickReplies.map(text => (
          <button
            key={text}
            onClick={() => setInput(text)}
            style={{
              padding: '10px 20px',
              borderRadius: '999px',
              background: '#F5E6D3',
              color: '#3D2B1F',
              fontSize: '22px',
              border: 'none',
              minHeight: '44px',
              minWidth: 'auto',
            }}
          >
            {text}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="说点什么..."
          style={{ flex: 1, fontSize: '26px', padding: '20px', minHeight: '72px', borderRadius: '20px' }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="btn btn-primary"
          style={{ fontSize: '28px', padding: '20px 32px', borderRadius: '20px' }}
        >
          发送
        </button>
      </div>
    </div>
  )
}
