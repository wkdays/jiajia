import { useEffect, useState, useRef } from 'react'
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space, Card } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons'
import api from '../services/api'

interface Material {
  id: number
  name: string
  alias: string | null
  intro: string | null
  createTime: string
}

export default function Materials() {
  const [data, setData] = useState<Material[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [importVisible, setImportVisible] = useState(false)
  const [importLoading, setImportLoading] = useState(false)
  const [csvContent, setCsvContent] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [form] = Form.useForm()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleBatchDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的成分')
      return
    }
    Modal.confirm({
      title: '确认批量删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 条成分吗？此操作不可恢复。`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        try {
          await api.delete('/materials/batch', { data: { ids: selectedRowKeys } })
          message.success('批量删除成功')
          setSelectedRowKeys([])
          fetchData(pagination.current, pagination.pageSize)
        } catch (err) {
          message.error('批量删除失败')
        }
      },
    })
  }

  const openEdit = (record: Material) => {
    setEditingId(record.id)
    form.setFieldsValue(record)
    setModalVisible(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setCsvContent(content)
    }
    reader.readAsText(file)
  }

  const handleImport = async () => {
    if (!csvContent.trim()) {
      message.error('请先上传 CSV 文件')
      return
    }

    setImportLoading(true)
    try {
      const res = await api.post('/export-import/import/material', {
        csvContent,
        fieldMapping: {
          name: '成分（英文）',
          alias: '成分（中文）',
          intro: '健康功效介绍',
        },
      })
      message.success(`导入完成！成功 ${res.data.imported} 条，失败 ${res.data.failed} 条`)
      if (res.data.failed > 0 && res.data.errors?.length) {
        Modal.warning({
          title: '部分导入失败',
          content: (
            <div style={{ maxHeight: 300, overflow: 'auto' }}>
              {res.data.errors.map((err: string, i: number) => (
                <div key={i} style={{ color: '#ff4d4f', fontSize: 12, marginBottom: 4 }}>{err}</div>
              ))}
            </div>
          ),
        })
      }
      setImportVisible(false)
      setCsvContent('')
      fetchData()
    } catch (err: any) {
      message.error(err.response?.data?.message || '导入失败')
    } finally {
      setImportLoading(false)
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '成分（英文）', dataIndex: 'name', width: 200 },
    { title: '成分（中文）', dataIndex: 'alias', width: 200, render: (v: string) => v || '-' },
    { title: '健康功效介绍', dataIndex: 'intro', ellipsis: true, render: (v: string) => v || '-' },
    {
      title: '操作',
      width: 200,
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
        <h2 style={{ margin: 0 }}>成分管理</h2>
        <Space>
          {selectedRowKeys.length > 0 && (
            <Button danger onClick={handleBatchDelete}>
              批量删除 ({selectedRowKeys.length})
            </Button>
          )}
          <Button icon={<UploadOutlined />} onClick={() => { setCsvContent(''); setImportVisible(true) }}>
            批量导入
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingId(null); form.resetFields(); setModalVisible(true) }}>
            新增成分
          </Button>
        </Space>
      </div>
      <Card>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={loading}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            onChange: (page, pageSize) => fetchData(page, pageSize),
          }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑成分' : '新增成分'}
        open={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => { setModalVisible(false); form.resetFields(); setEditingId(null) }}
        width={600}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="成分（英文）" rules={[{ required: true }]}>
            <Input placeholder="例如：Melatonin" />
          </Form.Item>
          <Form.Item name="alias" label="成分（中文）">
            <Input placeholder="例如：褪黑素" />
          </Form.Item>
          <Form.Item name="intro" label="健康功效介绍">
            <Input.TextArea rows={4} placeholder="健康功效介绍..." />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="批量导入成分"
        open={importVisible}
        onOk={handleImport}
        onCancel={() => { setImportVisible(false); setCsvContent('') }}
        confirmLoading={importLoading}
        width={600}
      >
        <div style={{ marginBottom: 16 }}>
          <p>请上传 CSV 文件，文件需包含以下列：</p>
          <ul style={{ color: '#666' }}>
            <li><strong>成分（英文）</strong> - 必填</li>
            <li><strong>成分（中文）</strong> - 可选</li>
            <li><strong>健康功效介绍</strong> - 可选</li>
          </ul>
          <p style={{ color: '#999', fontSize: 12 }}>示例：成分（英文）,成分（中文）,健康功效介绍<br/>Melatonin,褪黑素,调节睡眠周期，改善睡眠质量</p>
        </div>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <Button onClick={() => fileInputRef.current?.click()} icon={<UploadOutlined />}>
          {csvContent ? '重新选择文件' : '选择 CSV 文件'}
        </Button>
        {csvContent && (
          <div style={{ marginTop: 12, padding: 12, background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 4 }}>
            <span style={{ color: '#52c41a' }}>✓ 文件已加载，共 {csvContent.split('\n').filter(Boolean).length} 行</span>
          </div>
        )}
      </Modal>
    </div>
  )
}
