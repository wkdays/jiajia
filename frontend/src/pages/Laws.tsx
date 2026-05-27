import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space, Card, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import api from '../services/api'

interface Law {
  id: number
  name: string
  country: string
  effectiveDate: string | null
  scope: string | null
}

export default function Laws() {
  const [data, setData] = useState<Law[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form] = Form.useForm()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })

  const fetchData = async (page = 1, pageSize = 10) => {
    setLoading(true)
    try {
      const res = await api.get('/laws', { params: { page, pageSize } })
      setData(res.data.items || [])
      setPagination({ current: res.data.pagination?.page || 1, pageSize: res.data.pagination?.pageSize || 10, total: res.data.pagination?.total || 0 })
    } catch (err) { message.error('获取数据失败') } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (values: any) => {
    try {
      if (editingId) { await api.put(`/laws/${editingId}`, values); message.success('更新成功') }
      else { await api.post('/laws', values); message.success('创建成功') }
      setModalVisible(false); form.resetFields(); setEditingId(null); fetchData(pagination.current, pagination.pageSize)
    } catch (err: any) { message.error(err.response?.data?.message || '操作失败') }
  }

  const handleDelete = async (id: number) => {
    try { await api.delete(`/laws/${id}`); message.success('删除成功'); fetchData(pagination.current, pagination.pageSize) }
    catch (err) { message.error('删除失败') }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '法规名称', dataIndex: 'name', width: 300 },
    { title: '国家/地区', dataIndex: 'country', width: 120, render: (v: string) => <Tag color="orange">{v}</Tag> },
    { title: '生效日期', dataIndex: 'effectiveDate', width: 150, render: (v: string) => v ? new Date(v).toLocaleDateString() : '-' },
    { title: '适用范围', dataIndex: 'scope', ellipsis: true, render: (v: string) => v || '-' },
    { title: '操作', width: 180, render: (_: any, record: Law) => (
      <Space>
        <Button type="link" icon={<EditOutlined />} onClick={() => { setEditingId(record.id); form.setFieldsValue(record); setModalVisible(true) }}>编辑</Button>
        <Popconfirm title="确认删除？" onConfirm={() => handleDelete(record.id)}><Button type="link" danger icon={<DeleteOutlined />}>删除</Button></Popconfirm>
      </Space>
    )},
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>法规管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingId(null); form.resetFields(); setModalVisible(true) }}>新增法规</Button>
      </div>
      <Card>
        <Table rowKey="id" columns={columns} dataSource={data} loading={loading}
          pagination={{ ...pagination, showSizeChanger: true, showTotal: (total) => `共 ${total} 条`, onChange: (page, pageSize) => fetchData(page, pageSize) }} />
      </Card>
      <Modal title={editingId ? '编辑法规' : '新增法规'} open={modalVisible} onOk={() => form.submit()} onCancel={() => { setModalVisible(false); form.resetFields(); setEditingId(null) }} width={600}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="法规名称" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="country" label="国家/地区" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="effectiveDate" label="生效日期"><Input type="date" /></Form.Item>
          <Form.Item name="scope" label="适用范围"><Input.TextArea rows={3} /></Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
