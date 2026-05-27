import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space, Card, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import api from '../services/api'

interface Material {
  id: number
  name: string
  alias: string | null
  type: string
  intro: string | null
  source: string | null
  createTime: string
}

export default function Materials() {
  const [data, setData] = useState<Material[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form] = Form.useForm()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })

  const fetchData = async (page = 1, pageSize = 10) => {
    setLoading(true)
    try {
      const res = await api.get('/materials', { params: { page, pageSize } })
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

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (values: any) => {
    try {
      if (editingId) {
        await api.put(`/materials/${editingId}`, values)
        message.success('更新成功')
      } else {
        await api.post('/materials', values)
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

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/materials/${id}`)
      message.success('删除成功')
      fetchData(pagination.current, pagination.pageSize)
    } catch (err) {
      message.error('删除失败')
    }
  }

  const openEdit = (record: Material) => {
    setEditingId(record.id)
    form.setFieldsValue(record)
    setModalVisible(true)
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '名称', dataIndex: 'name', width: 150 },
    { title: '别名', dataIndex: 'alias', width: 120, render: (v: string) => v || '-' },
    { title: '类型', dataIndex: 'type', width: 100, render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: '简介', dataIndex: 'intro', ellipsis: true },
    { title: '来源', dataIndex: 'source', width: 120, render: (v: string) => v || '-' },
    {
      title: '操作',
      width: 180,
      render: (_: any, record: Material) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} onClick={() => openEdit(record)}>查看</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => openEdit(record)}>编辑</Button>
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
        <h2 style={{ margin: 0 }}>原料管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingId(null); form.resetFields(); setModalVisible(true) }}>
          新增原料
        </Button>
      </div>
      <Card>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            onChange: (page, pageSize) => fetchData(page, pageSize),
          }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑原料' : '新增原料'}
        open={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => { setModalVisible(false); form.resetFields(); setEditingId(null) }}
        width={600}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="名称" rules={[{ required: true }]}>
            <Input placeholder="例如：褪黑素" />
          </Form.Item>
          <Form.Item name="alias" label="别名">
            <Input placeholder="例如：Melatonin" />
          </Form.Item>
          <Form.Item name="type" label="类型" rules={[{ required: true }]}>
            <Input placeholder="例如：维生素/矿物质/草本" />
          </Form.Item>
          <Form.Item name="intro" label="简介">
            <Input.TextArea rows={3} placeholder="原料简介..." />
          </Form.Item>
          <Form.Item name="source" label="来源">
            <Input placeholder="例如：植物提取/化学合成" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
