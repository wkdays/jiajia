import { useEffect, useState } from 'react'
import { Card, Statistic, Row, Col, Spin } from 'antd'
import {
  ExperimentOutlined,
  MedicineBoxOutlined,
  BulbOutlined,
  FileTextOutlined,
  BookOutlined,
  UserOutlined,
} from '@ant-design/icons'
import api from '../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/search/aggregations').then(res => {
      setStats(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />

  const statCards = [
    { title: '原料数量', value: stats?.counts?.materials || 0, icon: <ExperimentOutlined />, color: '#1890ff' },
    { title: '健康问题', value: stats?.counts?.healthProblems || 0, icon: <MedicineBoxOutlined />, color: '#52c41a' },
    { title: '配方数量', value: stats?.counts?.formulas || 0, icon: <BulbOutlined />, color: '#faad14' },
    { title: '法规数量', value: stats?.counts?.laws || 0, icon: <FileTextOutlined />, color: '#eb2f96' },
    { title: '文献笔记', value: stats?.counts?.books || 0, icon: <BookOutlined />, color: '#722ed1' },
    { title: '系统用户', value: stats?.counts?.users || 0, icon: <UserOutlined />, color: '#13c2c2' },
  ]

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>仪表盘</h2>
      <Row gutter={[16, 16]}>
        {statCards.map((card, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card>
              <Statistic
                title={card.title}
                value={card.value}
                valueStyle={{ color: card.color }}
                prefix={card.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="原料类型分布">
            {stats?.materialByType?.map((item: any) => (
              <div key={item.type} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span>{item.type || '未分类'}</span>
                <span style={{ fontWeight: 'bold' }}>{item.count}</span>
              </div>
            )) || <div style={{ color: '#999', textAlign: 'center', padding: 40 }}>暂无数据</div>}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="配方目标国家分布">
            {stats?.formulaByCountry?.map((item: any) => (
              <div key={item.country} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span>{item.country}</span>
                <span style={{ fontWeight: 'bold' }}>{item.count}</span>
              </div>
            )) || <div style={{ color: '#999', textAlign: 'center', padding: 40 }}>暂无数据</div>}
          </Card>
        </Col>
      </Row>
    </div>
  )
}
