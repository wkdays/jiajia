import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space, Card, Tag, Select, Descriptions } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined, ThunderboltOutlined } from '@ant-design/icons'
import api from '../services/api'

interface Formula {
  id: number
  name: string
  healthId: number
  targetPeople: string | null
  targetCountry: string | null
  createUser: string | null
  status: string
  createTime: string
  health?: { name: string }
}

export default function Formulas() {
  const [data, setData] = useState<Formula[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false)
  const [generateVisible, setGenerateVisible] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null)
  const [form] = Form.useForm()
  const [genForm] = Form.useForm()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })
  const [healthOptions, setHealthOptions] = useState<any[]>([])

  const fetchData = async (page = 1, pageSize = 10) => {
    setLoading(true)
    try {
      const res = await api.get('/formulas', { params: { page, pageSize } })
      setData(res.data.items || [])
      setPagination({
        current: res.data.pagination?.page || 1,
        pageSize: res.data.pagination?.pageSize || 10,
        total: res.data.pagination?.total || 0,
      })
    } catch (err) {
      message.error('获取数据失败')
    } finally {
      setLoading(false)
    }
  }

  const fetchHealthOptions = async () => {
    try {
      const res = await api.get('/health-problems', { params: { pageSize: 100 } })
      setHealthOptions(res.data.items?.map((item: any) => ({ label: item.name, value: item.id })) || [])
    } catch (err) {
      console.error('获取健康问题失败')
    }
  }

  useEffect(() => {
    fetchData()
    fetchHealthOptions()
  }, [])

  const handleSubmit = async (values: any) => {
    try {
      if (editingId) {
        await api.put(`/formulas/${editingId}`, values)
        message.success('更新成功')
      } else {
        await api.post('/formulas', values)
        message.success('创建成功')
      }
      setModalVisible(false)
      form.resetFields()
      setEditingId(null)
      fetchData(pagination.current, pagination.pageSize)
    } catch (err: any) {
      message.error(err.response?.data?.message || '操作失败')
    }
  }

  const handleGenerate = async (values: any) => {
    try {
      const res = await api.post('/formulas/generate', values)
      message.success('配方自动生成成功')
      setGenerateVisible(false)
      genForm.resetFields()
      fetchData()
      setSelectedFormula(res.data)
      setDetailVisible(true)
    } catch (err: any) {
      message.error(err.response?.data?.message || '生成失败')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/formulas/${id}`)
      message.success('删除成功')
      fetchData(pagination.current, pagination.pageSize)
    } catch (err) {
      message.error('删除失败')
    }
  }

  const viewDetail = (record: Formula) => {
    setSelectedFormula(record)
    setDetailVisible(true)
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '名称', dataIndex: 'name', width: 250 },
    { title: '健康问题', dataIndex: ['health', 'name'], width: 150, render: (v: string) => v || '-' },
    { title: '目标人群', dataIndex: 'targetPeople', width: 120, render: (v: string) => v || '通用' },
    { title: '目标国家', dataIndex: 'targetCountry', width: 120, render: (v: string) => v || '-' },
    { title: '状态', dataIndex: 'status', width: 100, render: (v: string) => <Tag color={v === 'active' ? 'green' : 'default'}>{v || 'draft'}</Tag> },
    {
      title: '操作',
      width: 240,
      render: (_: any, record: Formula) => (
        <Space>
          <Button type="link" icon={<FileTextOutlined />} onClick={() => viewDetail(record)}>详情</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => { setEditingId(record.id); form.setFieldsValue(record); setModalVisible(true) }}>编辑</Button>
          <Popconfirm title="确认删除？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>配方管理</h2>
        <Space>
          <Button type="primary" icon={<ThunderboltOutlined />} onClick={() => { genForm.resetFields(); setGenerateVisible(true) }}>
            自动生成配方
          </Button>
          <Button icon={<PlusOutlined />} onClick={() => { setEditingId(null); form.resetFields(); setModalVisible(true) }}>
            手动创建
          </Button>
        </Space>
      </div>
      <Card>
        <Table rowKey="id" columns={columns} dataSource={data} loading={loading}
          pagination={{ ...pagination, showSizeChanger: true, showTotal: (total) => `共 ${total} 条`, onChange: (page, pageSize) => fetchData(page, pageSize) }} />
      </Card>

      <Modal title={editingId ? '编辑配方' : '手动创建配方'} open={modalVisible} onOk={() => form.submit()} onCancel={() => { setModalVisible(false); form.resetFields(); setEditingId(null) }} width={600}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="名称" rules={[{ required: true }]}><Input placeholder="配方名称" /></Form.Item>
          <Form.Item name="healthId" label="关联健康问题" rules={[{ required: true }]}>
            <Select options={healthOptions} placeholder="选择健康问题" showSearch optionFilterProp="label" />
          </Form.Item>
          <Form.Item name="targetPeople" label="目标人群"><Input placeholder="例如：成人/儿童/中老年" /></Form.Item>
          <Form.Item name="targetCountry" label="目标国家"><Input placeholder="例如：中国/美国/欧盟" /></Form.Item>
        </Form>
      </Modal>

      <Modal title="自动生成配方" open={generateVisible} onOk={() => genForm.submit()} onCancel={() => { setGenerateVisible(false); genForm.resetFields() }} width={600}>
        <Form form={genForm} onFinish={handleGenerate} layout="vertical">
          <Form.Item name="healthId" label="选择健康问题" rules={[{ required: true }]}>
            <Select options={healthOptions} placeholder="选择健康问题" showSearch optionFilterProp="label" />
          </Form.Item>
          <Form.Item name="targetPeople" label="目标人群"><Input placeholder="例如：成人" /></Form.Item>
          <Form.Item name="targetCountry" label="目标国家"><Input placeholder="例如：中国" /></Form.Item>
        </Form>
      </Modal>

      <Modal title="配方详情" open={detailVisible} onCancel={() => setDetailVisible(false)} footer={null} width={700}>
        {selectedFormula && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="ID">{selectedFormula.id}</Descriptions.Item>
            <Descriptions.Item label="名称">{selectedFormula.name}</Descriptions.Item>
            <Descriptions.Item label="健康问题">{selectedFormula.health?.name || '-'}</Descriptions.Item>
            <Descriptions.Item label="目标人群">{selectedFormula.targetPeople || '通用'}</Descriptions.Item>
            <Descriptions.Item label="目标国家">{selectedFormula.targetCountry || '-'}</Descriptions.Item>
            <Descriptions.Item label="创建人">{selectedFormula.createUser || '系统'}</Descriptions.Item>
            <Descriptions.Item label="状态"><Tag>{selectedFormula.status || 'draft'}</Tag></Descriptions.Item>
            <Descriptions.Item label="创建时间">{new Date(selectedFormula.createTime).toLocaleString()}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}
