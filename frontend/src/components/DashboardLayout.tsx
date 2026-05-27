import { Layout, Menu, Button, Avatar, Dropdown, Badge } from 'antd'
import {
  DashboardOutlined,
  ExperimentOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  BookOutlined,
  SearchOutlined,
  SettingOutlined,
  LogoutOutlined,
  BulbOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const { Header, Sider, Content } = Layout

const menuItems = [
  { key: '/', icon: <DashboardOutlined />, label: '仪表盘' },
  { key: '/materials', icon: <ExperimentOutlined />, label: '原料管理' },
  { key: '/health', icon: <MedicineBoxOutlined />, label: '健康问题' },
  { key: '/formulas', icon: <BulbOutlined />, label: '配方管理' },
  { key: '/laws', icon: <FileTextOutlined />, label: '法规管理' },
  { key: '/books', icon: <BookOutlined />, label: '文献笔记' },
  { key: '/search', icon: <SearchOutlined />, label: '全局搜索' },
  { key: '/admin', icon: <SettingOutlined />, label: '系统管理' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, user } = useAuth()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" width={200} style={{ boxShadow: '2px 0 8px rgba(0,0,0,0.05)' }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <h3 style={{ margin: 0, color: '#1890ff', fontWeight: 'bold' }}>JiaJia R&D</h3>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <Dropdown menu={{ items: [{ key: 'logout', icon: <LogoutOutlined />, label: '退出登录', onClick: logout }] }}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar style={{ backgroundColor: '#1890ff' }}>{user?.name?.[0] || 'U'}</Avatar>
              <span>{user?.name || user?.email || '用户'}</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8, minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
