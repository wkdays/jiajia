import { useState } from 'react'
import { Input, Button, Card, Tabs, Table, Tag, Statistic, Row, Col, Spin } from 'antd'
import { SearchOutlined, BarChartOutlined } from '@ant-design/icons'
import api from '../services/api'

const { TabPane } = Tabs

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [aggregations, setAggregations] = useState<any>(null)
  const [aggLoading, setAggLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await api.get('/search', { params: { query, page: 1, pageSize: 20 } })
      setResults(res.data)
    } catch (err) {
      console.error('搜索失败')
    } finally {
      setLoading(false)
    }
  }

  const loadAggregations = async () => {
    setAggLoading(true)
    try {
      const res = await api.get('/search/aggregations')
      setAggregations(res.data)
    } catch (err) {
      console.error('加载统计失败')
    } finally {
      setAggLoading(false)
    }
  }

  const renderTable = (data: any[], columns: any[]) => (
    <Table rowKey="id" columns={columns} dataSource={data} pagination={{ pageSize: 10 }} size="small" />
  )

  const materialColumns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '名称', dataIndex: 'name' },
    { title: '类型', dataIndex: 'type', render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: '别名', dataIndex: 'alias', render: (v: string) => v || '-' },
  ]

  const healthColumns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '名称', dataIndex: 'name' },
    { title: '类型', dataIndex: 'type', render: (v: string) => <Tag color="green">{v}</Tag> },
    { title: '症状', dataIndex: 'symptom', render: (v: string) => v || '-' },
  ]

  const formulaColumns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '名称', dataIndex: 'name' },
    { title: '健康问题', render: (record: any) => record.health?.name || '-' },
    { title: '目标人群', dataIndex: 'targetPeople', render: (v: string) => v || '通用' },
  ]

  const lawColumns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '名称', dataIndex: 'name' },
    { title: '国家', dataIndex: 'country', render: (v: string) => <Tag color="orange">{v}</Tag> },
  ]

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>全局搜索与统计</h2>

      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <Input.Search
            placeholder="输入关键词搜索原料、健康问题、配方、法规..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
            enterButton={<Button type="primary" icon={<SearchOutlined />}>搜索</Button>}
            size="large"
            style={{ flex: 1 }}
          />
          <Button size="large" icon={<BarChartOutlined />} onClick={loadAggregations} loading={aggLoading}>查看统计</Button>
        </div>
      </Card>

      {loading && <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />}

      {results && (
        <Card title={`搜索结果: "${results.query}" (共 ${results.totalCount} 条)`}>
          <Tabs defaultActiveKey="materials">
            <TabPane tab={`原料 (${results.results?.materials?.count || 0})`} key="materials">
              {renderTable(results.results?.materials?.items || [], materialColumns)}
            </TabPane>
            <TabPane tab={`健康问题 (${results.results?.healthProblems?.count || 0})`} key="health">
              {renderTable(results.results?.healthProblems?.items || [], healthColumns)}
            </TabPane>
            <TabPane tab={`配方 (${results.results?.formulas?.count || 0})`} key="formulas">
              {renderTable(results.results?.formulas?.items || [], formulaColumns)}
            </TabPane>
            <TabPane tab={`法规 (${results.results?.laws?.count || 0})`} key="laws">
              {renderTable(results.results?.laws?.items || [], lawColumns)}
            </TabPane>
          </Tabs>
        </Card>
      )}

      {aggregations && (
        <Card title="数据统计" style={{ marginTop: 24 }}>
          <Row gutter={[16, 16]}>
            <Col span={4}><Statistic title="原料" value={aggregations.counts?.materials || 0} /></Col>
            <Col span={4}><Statistic title="健康问题" value={aggregations.counts?.healthProblems || 0} /></Col>
            <Col span={4}><Statistic title="配方" value={aggregations.counts?.formulas || 0} /></Col>
            <Col span={4}><Statistic title="法规" value={aggregations.counts?.laws || 0} /></Col>
            <Col span={4}><Statistic title="文献" value={aggregations.counts?.books || 0} /></Col>
            <Col span={4}><Statistic title="用户" value={aggregations.counts?.users || 0} /></Col>
          </Row>
        </Card>
      )}
    </div>
  )
}
