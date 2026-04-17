import React, { useState, useEffect } from 'react'
import { reportApi } from '../api'

interface ReportData {
  id: string
  report_type: string
  period_start: string
  period_end: string
  memory_score: number
  language_score: number
  spatial_score: number
  semantic_score: number
  overall_score: number
  emotion_summary: Record<string, number>
  suggestions: string
  is_warning: boolean
  created_at: string
}

export default function ReportPage() {
  const [report, setReport] = useState<ReportData | null>(null)
  const [reports, setReports] = useState<ReportData[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [weeklyRes, listRes] = await Promise.allSettled([
        reportApi.weekly(),
        reportApi.list({ limit: 5 }),
      ])
      if (weeklyRes.status === 'fulfilled' && weeklyRes.value.data?.id) {
        setReport(weeklyRes.value.data)
      }
      if (listRes.status === 'fulfilled') {
        setReports(listRes.value.data || [])
      }
    } catch (err) {
      console.error('加载报告失败', err)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await reportApi.generateWeekly()
      if (res.data?.id) {
        setReport(res.data)
      }
    } catch (err) {
      console.error('生成报告失败', err)
    } finally {
      setGenerating(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50'
    if (score >= 60) return '#FF9800'
    return '#F44336'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '优秀'
    if (score >= 60) return '良好'
    if (score >= 40) return '一般'
    return '需加强'
  }

  if (loading) return <div className="loading-spinner" />

  return (
    <div className="fade-in">
      <div className="section-title">📊 认知评估报告</div>

      {report ? (
        <>
          {report.is_warning && (
            <div style={{
              background: '#FFF3F3',
              border: '2px solid #F44336',
              borderRadius: '16px',
              padding: '20px 24px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              <span style={{ fontSize: '40px' }}>⚠️</span>
              <div>
                <h3 style={{ fontSize: '28px', color: '#F44336', fontWeight: 700 }}>认知预警</h3>
                <p style={{ fontSize: '24px', color: '#C62828' }}>近期训练表现有所下降，建议关注并增加训练频次。</p>
              </div>
            </div>
          )}

          <div className="card" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>综合评分</h2>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                fontSize: '80px',
                fontWeight: 700,
                color: getScoreColor(report.overall_score),
              }}>
                {report.overall_score.toFixed(0)}
              </div>
              <div style={{ fontSize: '28px', color: getScoreColor(report.overall_score), fontWeight: 600 }}>
                {getScoreLabel(report.overall_score)}
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>各维度评分</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { label: '🧠 记忆力', score: report.memory_score },
                { label: '🗣️ 语言能力', score: report.language_score },
                { label: '🧭 空间定向', score: report.spatial_score },
                { label: '📖 语义记忆', score: report.semantic_score },
              ].map(item => (
                <div key={item.label} style={{
                  background: '#FFF8F0',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.label}</div>
                  <div style={{ fontSize: '48px', fontWeight: 700, color: getScoreColor(item.score) }}>
                    {item.score.toFixed(0)}
                  </div>
                  <div style={{ fontSize: '20px', color: '#8B7355' }}>{getScoreLabel(item.score)}</div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#E8D5BE',
                    borderRadius: '4px',
                    marginTop: '12px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${item.score}%`,
                      height: '100%',
                      background: getScoreColor(item.score),
                      borderRadius: '4px',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {report.suggestions && (
            <div className="card" style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>💡 建议</h2>
              <p style={{ fontSize: '26px', lineHeight: 1.8, color: '#3D2B1F' }}>
                {report.suggestions}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>📋</div>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>暂无周报</h2>
          <p style={{ fontSize: '24px', color: '#8B7355', marginBottom: '24px' }}>
            完成一些健脑游戏后，即可生成认知评估报告
          </p>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="btn btn-primary btn-lg"
          >
            {generating ? '生成中...' : '生成本周报告'}
          </button>
        </div>
      )}

      {reports.length > 0 && (
        <>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '20px', marginTop: '16px' }}>历史报告</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reports.map(r => (
              <div key={r.id} className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '24px', fontWeight: 600 }}>
                      {r.report_type === 'weekly' ? '周报' : '月报'}
                    </span>
                    <span style={{ fontSize: '20px', color: '#8B7355', marginLeft: '12px' }}>
                      {new Date(r.created_at).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 700, color: getScoreColor(r.overall_score) }}>
                      {r.overall_score.toFixed(0)}
                    </span>
                    {r.is_warning && <span style={{ fontSize: '28px' }}>⚠️</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
