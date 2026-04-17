import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { gameApi } from '../api'

interface Question {
  question_id: string
  type: string
  content: string
  options: string[]
  option_media?: Record<string, string>
  correct_answer: string
  hint: string
  media_url: string
}

export default function GamePlayPage() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [difficulty, setDifficulty] = useState(1)
  const [startTime] = useState(Date.now())
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (code) loadSession()
  }, [code])

  const loadSession = async () => {
    try {
      const res = await gameApi.session(code!, difficulty)
      const data = res.data
      setQuestions(data.questions || [])
      setDifficulty(data.difficulty || 1)
    } catch (err) {
      console.error('加载游戏失败', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (answer: string) => {
    if (showResult) return
    setSelectedAnswer(answer)
    setShowResult(true)

    const isCorrect = answer === questions[currentIndex].correct_answer
    if (isCorrect) {
      setScore(prev => prev + 10)
      setCorrectCount(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setGameOver(true)
      submitResult()
    } else {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowHint(false)
    }
  }

  const submitResult = async () => {
    const accuracy = questions.length > 0 ? correctCount / questions.length : 0
    const duration = Math.round((Date.now() - startTime) / 1000)
    try {
      const gameId = questions.length > 0 ? 'game_id_placeholder' : ''
      if (questions.length > 0) {
        await gameApi.submitResult({
          game_id: gameId,
          difficulty,
          score,
          accuracy,
          duration_seconds: duration,
          detail: { cognitive_domain: code },
        })
      }
    } catch (err) {
      console.error('提交结果失败', err)
    }
  }

  if (loading) return <div className="loading-spinner" />

  if (gameOver) {
    const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0
    return (
      <div className="fade-in" style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ fontSize: '100px', marginBottom: '24px' }}>
          {accuracy >= 80 ? '🎉' : accuracy >= 50 ? '👍' : '💪'}
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px' }}>
          {accuracy >= 80 ? '太棒了！' : accuracy >= 50 ? '不错哦！' : '继续加油！'}
        </h1>
        <div className="card" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '56px', fontWeight: 700, color: '#C7522A' }}>{score}</div>
              <div style={{ fontSize: '24px', color: '#8B7355' }}>得分</div>
            </div>
            <div>
              <div style={{ fontSize: '56px', fontWeight: 700, color: '#4CAF50' }}>{accuracy}%</div>
              <div style={{ fontSize: '24px', color: '#8B7355' }}>正确率</div>
            </div>
            <div>
              <div style={{ fontSize: '56px', fontWeight: 700, color: '#FF9800' }}>{correctCount}/{questions.length}</div>
              <div style={{ fontSize: '24px', color: '#8B7355' }}>答对题数</div>
            </div>
            <div>
              <div style={{ fontSize: '56px', fontWeight: 700, color: '#9C27B0' }}>{'⭐'.repeat(difficulty)}</div>
              <div style={{ fontSize: '24px', color: '#8B7355' }}>难度</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/game')}>
            返回游戏列表
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => {
            setGameOver(false)
            setCurrentIndex(0)
            setSelectedAnswer(null)
            setShowResult(false)
            setScore(0)
            setCorrectCount(0)
            loadSession()
          }}>
            再玩一次
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  if (!currentQuestion) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎮</div>
        <div className="empty-text">暂无题目</div>
        <button className="btn btn-primary" onClick={() => navigate('/game')} style={{ marginTop: '24px' }}>
          返回游戏列表
        </button>
      </div>
    )
  }

  const hasOptionImages = currentQuestion.options.some(option => currentQuestion.option_media?.[option])

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button onClick={() => navigate('/game')} className="btn btn-secondary" style={{ fontSize: '24px' }}>
          ← 退出
        </button>
        <div style={{ fontSize: '24px', color: '#8B7355' }}>
          第 {currentIndex + 1} / {questions.length} 题
        </div>
        <div style={{ fontSize: '28px', fontWeight: 700, color: '#C7522A' }}>
          {score} 分
        </div>
      </div>

      <div style={{
        width: '100%',
        height: '8px',
        background: '#E8D5BE',
        borderRadius: '4px',
        marginBottom: '32px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${((currentIndex + 1) / questions.length) * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #C7522A, #E8734D)',
          borderRadius: '4px',
          transition: 'width 0.3s ease',
        }} />
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1.4, marginBottom: '24px' }}>
          {currentQuestion.content}
        </h2>

        {currentQuestion.hint && !showHint && (
          <button
            onClick={() => setShowHint(true)}
            style={{ color: '#FF9800', fontSize: '24px', marginBottom: '16px', minHeight: 'auto', minWidth: 'auto' }}
          >
            💡 需要提示？
          </button>
        )}
        {showHint && currentQuestion.hint && (
          <div style={{
            background: '#FFF8E1',
            padding: '16px 24px',
            borderRadius: '12px',
            fontSize: '24px',
            color: '#F57C00',
            marginBottom: '16px',
          }}>
            💡 {currentQuestion.hint}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: hasOptionImages ? 'repeat(2, minmax(0, 1fr))' : '1fr',
          gap: '16px',
        }}>
          {currentQuestion.options.map((option, idx) => {
            let bg = '#F5E6D3'
            let borderColor = 'transparent'
            if (showResult) {
              if (option === currentQuestion.correct_answer) {
                bg = '#E8F5E9'
                borderColor = '#4CAF50'
              } else if (option === selectedAnswer && option !== currentQuestion.correct_answer) {
                bg = '#FFEBEE'
                borderColor = '#F44336'
              }
            } else if (option === selectedAnswer) {
              bg = '#C7522A'
              borderColor = '#C7522A'
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                aria-label={option}
                style={{
                  width: '100%',
                  padding: hasOptionImages ? '18px' : '24px 32px',
                  fontSize: hasOptionImages ? '24px' : '28px',
                  fontWeight: 600,
                  background: bg,
                  color: showResult && option === currentQuestion.correct_answer ? '#2E7D32' :
                         showResult && option === selectedAnswer && option !== currentQuestion.correct_answer ? '#C62828' :
                         option === selectedAnswer ? '#fff' : '#3D2B1F',
                  border: `3px solid ${borderColor}`,
                  borderRadius: '16px',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  minHeight: hasOptionImages ? '250px' : '72px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: hasOptionImages ? 'stretch' : 'flex-start',
                  justifyContent: 'center',
                  gap: '14px',
                }}
              >
                {currentQuestion.option_media?.[option] && (
                  <img
                    src={currentQuestion.option_media[option]}
                    alt={option}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '14px',
                      background: '#fff',
                    }}
                  />
                )}
                {!hasOptionImages && (
                  <span style={{
                    fontSize: '28px',
                    lineHeight: 1.35,
                    textAlign: 'left',
                    width: '100%',
                  }}>
                    {String.fromCharCode(65 + idx)}. {option}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {showResult && (
        <div className="slide-up">
          <div style={{
            textAlign: 'center',
            fontSize: '32px',
            fontWeight: 700,
            marginBottom: '20px',
            color: selectedAnswer === currentQuestion.correct_answer ? '#4CAF50' : '#F44336',
          }}>
            {selectedAnswer === currentQuestion.correct_answer ? '✅ 回答正确！' : `❌ 正确答案是：${currentQuestion.correct_answer}`}
          </div>
          <button onClick={handleNext} className="btn btn-primary btn-block btn-lg">
            {currentIndex + 1 >= questions.length ? '查看结果' : '下一题 →'}
          </button>
        </div>
      )}
    </div>
  )
}
