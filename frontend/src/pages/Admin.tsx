import { useEffect, useState } from 'react'
import { Card, Table, Button, Tag, Statistic, Row, Col, Spin, message } from 'antd'
import { UserOutlined, FileTextOutlined, DatabaseOutlined } from '@ant-design/icons'
import api from '../services/api'

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [auditLogs, setAuditLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [usersRes, statsRes, logsRes] = await Promise.all([
        api.get('/admin/users', { params: { pageSize: 100 } }),
        api.get('/admin/stats'),
        api.get('/admin/audit-logs', { params: { pageSize: 50 } }),
      ])
      setUsers(usersRes.data.items || [])
      setStats(statsRes.data)
      setAuditLogs(logsRes.data.items || [])
    } catch (err) {
      message.error('获取管理数据失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleBackup = async () => {
    try {
      const res = await api.get('/admin/backup', { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `backup-${new Date().toISOString().split('T')[0]}.json`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      message.success('备份下载成功')
    } catch (err) {
      message.error('备份失败')
    }
  }

  const userColumns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '用户名', dataIndex: 'username', render: (v: string) => v || '-' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '姓名', dataIndex: 'name', render: (v: string) => v || '-' },
    { title: '角色', dataIndex: 'role', render: (v: string) => <Tag color={v === 'admin' ? 'red' : 'blue'}>{v}</Tag> },
    { title: '创建时间', dataIndex: 'createdAt', render: (v: string) => new Date(v).toLocaleString() },
  ]

  const logColumns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '用户ID', dataIndex: 'userId', width: 80 },
    { title: '操作', dataIndex: 'action', width: 80 },
    { title: '实体', dataIndex: 'entity', width: 100 },
    { title: '实体ID', dataIndex: 'entityId', width: 80, render: (v: number) => v || '-' },
    { title: 'IP', dataIndex: 'ip', width: 120 },
    { title: '时间', dataIndex: 'createdAt', render: (v: string) => new Date(v).toLocaleString() },
  ]

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>系统管理</h2>
        <Button type="primary" icon={<DatabaseOutlined />} onClick={handleBackup}>下载备份</Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}><Card><Statistic title="总用户" value={stats?.users || 0} prefix={<UserOutlined />} /></Card></Col>
        <Col span={6}><Card><Statistic title="原料数量" value={stats?.materials || 0} /></Card></Col>
        <Col span={6}><Card><Statistic title="配方数量" value={stats?.formulas || 0} /></Card></Col>
        <Col span={6}><Card><Statistic title="审计日志" value={stats?.auditLogs || 0} prefix={<FileTextOutlined />} /></Card></Col>
      </Row>

      <Card title="用户列表" style={{ marginBottom: 24 }}>
        <Table rowKey="id" columns={userColumns} dataSource={users} pagination={{ pageSize: 10 }} size="small" />
      </Card>

      <Card title="审计日志">
        <Table rowKey="id" columns={logColumns} dataSource={auditLogs} pagination={{ pageSize: 10 }} size="small" />
      </Card>
    </div>
  )
}
