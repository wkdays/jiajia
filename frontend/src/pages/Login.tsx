import { useState } from 'react'
import { Form, Input, Button, Card, message, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'

const { Title } = Typography

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', values)
      login(res.data.token, res.data.user)
      message.success('登录成功')
    } catch (err: any) {
      message.error(err.response?.data?.message || '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card style={{ width: 400, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            膳食补充剂研发数据库
          </Title>
          <p style={{ color: '#666', marginTop: 8 }}>专业配方研发管理系统</p>
        </div>
        <Form onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="邮箱" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              登录
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center', color: '#999', fontSize: 12 }}>
            默认账号: test@example.com / password123
          </div>
        </Form>
      </Card>
    </div>
  )
}
