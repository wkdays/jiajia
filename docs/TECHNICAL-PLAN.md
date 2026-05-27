# 专业膳食补充剂研发数据库系统 — 技术实现方案

**文档版本**: V1.0  
**编制日期**: 2026-05-27  
**适用对象**: 后端开发、前端开发、产品、测试  
**技术栈**: Node.js v26 + TypeScript + NestJS + Prisma + MySQL 8.0

---

## 1. 技术栈选型

| 层级 | 选型 | 选型理由 |
|------|------|----------|
| **运行时** | Node.js v26 + TypeScript 5.x | 环境已有；TS 提供 19 个实体的类型安全 |
| **后端框架** | **NestJS 11** | 模块化架构天然映射 5 大业务模块；内置 DI/守卫/拦截器；Fastify 适配器可选 |
| **ORM** | **Prisma 6** | 最佳 TS 类型安全；声明式 schema-first；迁移系统完善；Prisma Studio 可视化 |
| **API 风格** | **RESTful** | CRUD 密集型领域；比 GraphQL 更简单；易于缓存和文档化 |
| **校验** | class-validator + class-transformer | NestJS 原生支持；装饰器式 DTO 校验 |
| **认证** | Passport + JWT | @nestjs/jwt + @nestjs/passport；RBAC 自定义守卫 |
| **Excel** | exceljs | 全功能读写/流式处理；现代 Node.js 最佳 |
| **PDF** | pdfkit + Puppeteer | pdfkit 程序化生成；Puppeteer HTML 转 PDF（模板报告） |
| **Word** | docx (npm) | 纯 JS .docx 生成；模板支持 |
| **搜索** | MySQL FULLTEXT (Phase 1) → Meilisearch (Phase 2) | 先简单；FULLTEXT 不足时再升级 |
| **日志** | Winston via NestJS | 结构化 JSON；文件轮转；按环境分级 |
| **监控** | Prometheus + Grafana | NestJS Prometheus 拦截器；Dashboard 模板 |
| **加密** | crypto-js + bcrypt | AES-256 静态 PII；bcrypt 密码；字段级加密服务 |
| **审计** | Prisma 中间件 | 拦截所有写入；存入审计日志表 |
| **测试** | Jest + Supertest | NestJS 默认；单元 + 集成 + E2E |
| **部署** | Docker Compose (dev/staging) → Docker Swarm (prod) | 单服务器起步；Vulture 零停机部署 |
| **备份** | mysqldump cron + S3 上传 | 每日自动；30 天保留；恢复测试 |

### 替代方案排除

| 被排除 | 原因 |
|--------|------|
| Express | 无内置模块化；5 个模块样板代码过多 |
| Fastify (裸) | 好但缺少 NestJS 的 DI/守卫/拦截器生态 |
| TypeORM | 功能更多但更 buggy；TS 推断更差；装饰器复杂 |
| Sequelize | 遗留 API；TS 支持差；v7 仍 beta |
| GraphQL | 对此规模 CRUD 过度工程；无实质收益 |
| Elasticsearch | Phase 1 基础设施过重；MySQL FULLTEXT 先足够 |

---

## 2. 项目目录结构

```
jiajia/
├── docker/
│   ├── docker-compose.yml              # Dev: MySQL + Redis + Meilisearch
│   ├── docker-compose.prod.yml         # Prod overrides
│   ├── mysql/
│   │   └── init/
│   │       ├── 01-schema.sql           # Prisma 生成初始 schema
│   │       └── 02-seed.sql             # 参考数据种子
│   └── nginx/
│       └── nginx.conf                  # 反向代理配置
├── prisma/
│   ├── schema.prisma                   # 数据库 schema 定义
│   ├── migrations/                      # 自动迁移
│   └── seed.ts                          # 参考数据填充
├── scripts/
│   ├── backup.sh                        # MySQL 每日备份
│   ├── restore.sh                       # 从备份恢复
│   └── generate-ssl.sh                  # SSL 证书生成
├── src/
│   ├── main.ts                          # 引导 + NestFactory
│   ├── app.module.ts                    # 根模块
│   │
│   ├── common/                          # 共享工具
│   │   ├── constants/
│   │   │   ├── error-codes.ts           # 集中式错误码枚举
│   │   │   ├── roles.ts                 # 角色定义
│   │   │   └── index.ts
│   │   ├── decorators/
│   │   │   ├── audit-log.ts             # @AuditLog() 装饰器
│   │   │   ├── require-roles.ts         # @RequireRoles() 装饰器
│   │   │   └── index.ts
│   │   ├── dto/
│   │   │   ├── pagination.dto.ts        # 标准分页 DTO
│   │   │   ├── api-response.dto.ts      # 标准响应包装
│   │   │   └── index.ts
│   │   ├── filters/
│   │   │   ├── http-exception.filter.ts
│   │   │   ├── prisma-exception.filter.ts
│   │   │   └── index.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── index.ts
│   │   ├── interceptors/
│   │   │   ├── audit-log.interceptor.ts   # 自动捕获变更日志
│   │   │   ├── transform.interceptor.ts   # 统一响应包装
│   │   │   ├── logging.interceptor.ts
│   │   │   └── index.ts
│   │   ├── pipes/
│   │   │   ├── validation.pipe.ts
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── encryption.util.ts       # AES-256 加解密
│   │       ├── mask.util.ts             # 数据脱敏工具
│   │       ├── date.util.ts
│   │       └── index.ts
│   │
│   ├── config/
│   │   ├── config.module.ts
│   │   ├── config.service.ts            # 从 env 读取的类型化配置
│   │   └── configuration.ts             # Schema 校验
│   │
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts            # PrismaClient 单例 + 中间件
│   │
│   └── modules/
│       ├── auth/
│       │   ├── auth.module.ts
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   ├── dto/
│       │   │   ├── login.dto.ts
│       │   │   └── register.dto.ts
│       │   └── strategies/
│       │       ├── jwt.strategy.ts
│       │       └── local.strategy.ts
│       │
│       ├── material/                     # 模块1: 原料数据库
│       │   ├── material.module.ts
│       │   ├── material.controller.ts    # /api/materials/*
│       │   ├── material.service.ts
│       │   ├── sub-controllers/
│       │   │   ├── material-base.controller.ts
│       │   │   ├── material-supplier.controller.ts
│       │   │   ├── material-effect.controller.ts
│       │   │   ├── material-clinic.controller.ts
│       │   │   ├── material-patent.controller.ts
│       │   │   └── material-safety.controller.ts
│       │   ├── sub-services/
│       │   │   ├── material-base.service.ts
│       │   │   ├── material-supplier.service.ts
│       │   │   ├── material-effect.service.ts
│       │   │   ├── material-clinic.service.ts
│       │   │   ├── material-patent.service.ts
│       │   │   └── material-safety.service.ts
│       │   └── dto/
│       │       ├── create-material-base.dto.ts
│       │       ├── update-material-base.dto.ts
│       │       ├── query-material.dto.ts
│       │       └── ...
│       │
│       ├── health/                       # 模块2: 健康问题数据库
│       │   ├── health.module.ts
│       │   ├── health.controller.ts      # /api/health-problems/*
│       │   ├── health.service.ts
│       │   ├── sub-controllers/
│       │   │   ├── health-base.controller.ts
│       │   │   ├── health-mechanism.controller.ts
│       │   │   ├── health-cause.controller.ts
│       │   │   └── health-material.controller.ts
│       │   ├── sub-services/
│       │   │   ├── health-base.service.ts
│       │   │   ├── health-mechanism.service.ts
│       │   │   ├── health-cause.service.ts
│       │   │   └── health-material.service.ts
│       │   └── dto/
│       │       └── ...
│       │
│       ├── law/                           # 模块3: 全球法规数据库
│       │   ├── law.module.ts
│       │   ├── law.controller.ts          # /api/laws/*
│       │   ├── law.service.ts
│       │   ├── sub-controllers/
│       │   │   ├── law-base.controller.ts
│       │   │   ├── law-material.controller.ts
│       │   │   └── law-update.controller.ts
│       │   ├── sub-services/
│       │   │   ├── law-base.service.ts
│       │   │   ├── law-material.service.ts
│       │   │   └── law-update.service.ts
│       │   └── dto/
│       │       └── ...
│       │
│       ├── formula/                       # 模块4: 配方智能输出
│       │   ├── formula.module.ts
│       │   ├── formula.controller.ts      # /api/formulas/*
│       │   ├── formula.service.ts
│       │   ├── formula-generator.service.ts   # 核心: 自动生成配方
│       │   ├── sub-controllers/
│       │   │   ├── formula-base.controller.ts
│       │   │   ├── formula-material.controller.ts
│       │   │   └── formula-logic.controller.ts
│       │   ├── sub-services/
│       │   │   ├── formula-base.service.ts
│       │   │   ├── formula-material.service.ts
│       │   │   └── formula-logic.service.ts
│       │   └── dto/
│       │       ├── create-formula.dto.ts
│       │       ├── generate-formula.dto.ts   # 输入: health_id + target_people + country
│       │       └── ...
│       │
│       ├── book/                          # 模块5: 专业书籍学习记录
│       │   ├── book.module.ts
│       │   ├── book.controller.ts         # /api/books/*
│       │   ├── book.service.ts
│       │   ├── sub-controllers/
│       │   │   ├── book-base.controller.ts
│       │   │   ├── book-record.controller.ts
│       │   │   └── book-rel.controller.ts
│       │   ├── sub-services/
│       │   │   ├── book-base.service.ts
│       │   │   ├── book-record.service.ts
│       │   │   └── book-rel.service.ts
│       │   └── dto/
│       │       └── ...
│       │
│       ├── export/                        # 文件导出模块
│       │   ├── export.module.ts
│       │   ├── export.controller.ts        # /api/exports/*
│       │   ├── export.service.ts
│       │   ├── generators/
│       │   │   ├── excel-generator.service.ts
│       │   │   ├── pdf-generator.service.ts
│       │   │   └── word-generator.service.ts
│       │   └── dto/
│       │       └── export-request.dto.ts
│       │
│       ├── import/                        # 批量导入模块
│       │   ├── import.module.ts
│       │   ├── import.controller.ts        # /api/imports/*
│       │   ├── import.service.ts
│       │   └── dto/
│       │       └── import-request.dto.ts
│       │
│       └── audit/                         # 操作日志模块
│           ├── audit.module.ts
│           ├── audit.controller.ts         # /api/audit-logs/*
│           └── audit.service.ts
│
├── test/
│   ├── jest-e2e.json
│   ├── unit/
│   │   ├── modules/
│   │   │   ├── material/
│   │   │   │   ├── material-base.service.spec.ts
│   │   │   │   ├── material-base.controller.spec.ts
│   │   │   │   └── ...
│   │   │   └── ...
│   │   └── common/
│   │       ├── encryption.util.spec.ts
│   │       └── mask.util.spec.ts
│   ├── integration/
│   │   ├── material.integration.spec.ts
│   │   ├── formula.integration.spec.ts
│   │   └── ...
│   └── e2e/
│       ├── auth.e2e-spec.ts
│       ├── material.e2e-spec.ts
│       ├── formula.e2e-spec.ts
│       └── ...
│
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
├── package.json
└── README.md
```

---

## 3. 架构设计

### 3.1 分层架构

```
┌─────────────────────────────────────────────────┐
│                   Controller                     │  ← 请求校验、认证守卫、响应格式
├─────────────────────────────────────────────────┤
│                    Service                       │  ← 业务逻辑、编排、跨模块调用
├─────────────────────────────────────────────────┤
│                  Prisma Repository               │  ← 数据访问 (Prisma Client 生成查询)
├─────────────────────────────────────────────────┤
│                   MySQL 8.0                      │  ← 持久化存储
└─────────────────────────────────────────────────┘

横切关注点:
  ├── Guards (JWT 认证, RBAC)
  ├── Interceptors (审计日志, 响应转换, 日志)
  ├── Filters (异常处理)
  └── Pipes (校验)
```

**数据流**:
```
HTTP Request
  → Guard (JWT 认证 + 角色检查)
  → Pipe (DTO 校验)
  → Controller (提取参数, 调用 service)
  → Service (业务逻辑, 可能调用其他模块)
  → PrismaService (数据库查询)
  → Interceptor (审计日志写入)
  → Response Transform
  → HTTP Response
```

### 3.2 模块依赖图

```
                    ┌────────────┐
                    │    Auth     │  ← 独立, 无业务依赖
                    └────────────┘

┌───────────┐     ┌─────────────┐     ┌───────────┐
│  Material  │────│   Health    │────│  Formula   │
│  Database  │     │  Problems  │     │ Generator │
└───────────┘     └──────┬──────┘     └──────┬────┘
      │                  │                   │
      │           ┌──────┴──────┐            │
      └───────────│    Law      │────────────┘
                  │  Regulation │
                  └─────────────┘

┌───────────┐     ┌─────────────┐
│   Book     │────│   Audit     │  ← 横切
│  Records   │    │    Log      │
└───────────┘     └─────────────┘

┌───────────┐     ┌─────────────┐
│   Export   │────│   Import    │  ← 使用所有业务模块
└───────────┘     └─────────────┘
```

**关键跨模块调用**:
- `FormulaGenerator` → 调用 `MaterialService`, `HealthService`, `LawService`
- `ExportService` → 调用任意业务模块提取数据
- `ImportService` → 调用任意业务模块批量创建
- `AuditLogInterceptor` → 每次变更写入 `AuditLog`

### 3.3 数据库设计补充

#### 索引策略

```sql
-- 复合索引覆盖常用查询模式
-- Material Base
CREATE INDEX idx_material_name_type ON t_material_base(name, type);
CREATE INDEX idx_material_type ON t_material_base(type);

-- Material 子表: material_id 是主要查询条件
CREATE INDEX idx_material_supplier_mid ON t_material_supplier(material_id);
CREATE INDEX idx_material_effect_mid ON t_material_effect(material_id);
CREATE INDEX idx_material_clinic_mid ON t_material_clinic(material_id);
CREATE INDEX idx_material_patent_mid ON t_material_patent(material_id);
CREATE INDEX idx_material_safety_mid ON t_material_safety(material_id);

-- Health Base
CREATE INDEX idx_health_name_type ON t_health_base(name, type);

-- Health-Material 关联: 双向查询
CREATE INDEX idx_health_material_hid ON t_health_material(health_id);
CREATE INDEX idx_health_material_mid ON t_health_material(material_id);

-- Law Material 合规
CREATE INDEX idx_law_material_lid ON t_law_material(law_id);
CREATE INDEX idx_law_material_mid ON t_law_material(material_id);
CREATE INDEX idx_law_material_status ON t_law_material(compliance_status);

-- Formula 查询
CREATE INDEX idx_formula_health ON t_formula_base(health_id);
CREATE INDEX idx_formula_country ON t_formula_base(target_country);
CREATE INDEX idx_formula_material_fid ON t_formula_material(formula_id);

-- FULLTEXT 模糊搜索 (Phase 1)
ALTER TABLE t_material_base ADD FULLTEXT INDEX ft_material_search(name, alias, intro);
ALTER TABLE t_health_base ADD FULLTEXT INDEX ft_health_search(name, symptom);
ALTER TABLE t_law_base ADD FULLTEXT INDEX ft_law_search(name, scope);
```

#### 分表策略 (未来)
- 初期不分表 (单表 10K-1M 行)
- `t_formula_base` 超过 10M → 按 `create_time` 月度分区
- `t_audit_log` 超过 100M → 按 `created_at` 月度分区 + 冷归档

#### 备份策略
- **每日**: `mysqldump --single-transaction --routines --triggers` 凌晨 02:00 UTC+8
- **保留**: 30 天日备份 + 12 个月月备份
- **存储**: 本地 `/backups/` + S3 上传
- **恢复测试**: 每月自动恢复到 staging + 完整性校验
- **时间点恢复**: MySQL binlog 启用, 7 天保留

### 3.4 安全设计

#### 敏感数据加密

```typescript
// 字段级加密服务
class EncryptionService {
  // AES-256-GCM 用于 PII 字段 (供应商价格, 竞品信息)
  encrypt(plaintext: string): string
  decrypt(ciphertext: string): string
  
  // 导出时数据脱敏
  mask(value: string, type: 'phone' | 'email' | 'price'): string
}
```

**加密字段**:
- `t_material_supplier.price` → AES-256 加密
- `t_material_supplier.competitor_info` → AES-256 加密
- `t_material_patent.competitor_info` → AES-256 加密
- 密码 → bcrypt (10 rounds)

#### RBAC 模型

```
角色:
  admin       → 全权限 (CRUD 所有 + 用户管理)
  researcher  → 读取所有 + 写入原料/健康/书籍
  formulator  → 读取所有 + 写入配方
  compliance  → 读取所有 + 写入法规 + 合规校验
  viewer      → 只读

权限矩阵:
  资源              | admin | researcher | formulator | compliance | viewer
  ────────────────┼───────┼────────────┼────────────┼────────────┼───────
  materials:CRUD   |  ✓    |    ✓       |     R      |     R      |  R
  health:CRUD      |  ✓    |    ✓       |     R      |     R      |  R
  laws:CRUD        |  ✓    |    R       |     R      |     ✓      |  R
  formulas:CUD     |  ✓    |    R       |     ✓      |     R      |  R
  books:CRUD       |  ✓    |    ✓       |     R      |     R      |  R
  audit-logs:R     |  ✓    |    ✗       |     ✗      |     ✗      |  ✗
  export            |  ✓    |    ✓       |     ✓      |     ✓      |  ✓
```

#### 审计日志设计

```prisma
model AuditLog {
  id          Int       @id @default(autoincrement())
  userId      Int
  action      String    // CREATE | UPDATE | DELETE | EXPORT | IMPORT
  entity      String    // material_base | formula | 等
  entityId    Int?
  changes     Json      // { before: {...}, after: {...} }
  ip          String
  userAgent   String
  createdAt   DateTime  @default(now())
}
```

---

## 4. API 设计规范

### 4.1 URL 命名规范

```
Base: /api/v1

Pattern: /api/v1/{module}/{resource}[/{id}][/{sub-resource}]

Examples:
  GET    /api/v1/materials                      # 列表 (分页)
  GET    /api/v1/materials/:id                  # 详情
  POST   /api/v1/materials                      # 创建
  PUT    /api/v1/materials/:id                  # 更新
  DELETE /api/v1/materials/:id                   # 删除
  
  GET    /api/v1/materials/:id/suppliers         # 原料供应商列表
  POST   /api/v1/materials/:id/suppliers         # 添加供应商
  GET    /api/v1/materials/:id/effects           # 原料功效列表
  
  GET    /api/v1/health-problems                 # 健康问题列表
  GET    /api/v1/health-problems/:id             # 健康问题详情
  GET    /api/v1/health-problems/:id/materials   # 匹配原料
  
  GET    /api/v1/laws                             # 法规列表
  GET    /api/v1/laws/:id/materials               # 法规-原料合规
  
  POST   /api/v1/formulas/generate               # 自动生成配方
  GET    /api/v1/formulas/:id                     # 配方详情
  PUT    /api/v1/formulas/:id/materials           # 调整配方原料
  
  POST   /api/v1/exports/excel                    # 导出 Excel
  POST   /api/v1/exports/pdf                      # 导出 PDF
  POST   /api/v1/imports/excel                    # 导入 Excel
  
  POST   /api/v1/auth/login                       # 登录
  POST   /api/v1/auth/register                    # 注册
  GET    /api/v1/auth/profile                     # 当前用户
```

### 4.2 请求/响应格式

**成功响应**:
```json
{
  "code": 0,
  "message": "success",
  "data": { ... },
  "timestamp": "2026-05-27T10:00:00Z"
}
```

**分页列表响应**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 156,
      "totalPages": 8
    }
  },
  "timestamp": "2026-05-27T10:00:00Z"
}
```

**错误响应**:
```json
{
  "code": 40001,
  "message": "Material not found",
  "errors": [
    { "field": "id", "message": "Material with id 999 does not exist" }
  ],
  "timestamp": "2026-05-27T10:00:00Z"
}
```

### 4.3 错误码规范

```
格式: {HTTP_STATUS}{MODULE}{ERROR_TYPE}

通用:
  00000 = 成功
  40000 = Bad Request (校验失败)
  40100 = 未授权
  40300 = 禁止访问 (角色不足)
  40400 = 未找到
  40900 = 冲突 (重复)
  42900 = 请求过多
  50000 = 内部错误

模块专用 (替换 {M}):
  4{M}001 = 校验错误
  4{M}002 = 未找到
  4{M}003 = 重复
  4{M}004 = 外键冲突
  5{M}001 = 服务不可用

模块代码:
  01 = Auth
  02 = Material
  03 = Health
  04 = Law
  05 = Formula
  06 = Book
  07 = Export
  08 = Import

示例:
  402001 = Material 校验错误
  402002 = Material 未找到
  402003 = Material 名称已存在
  402004 = Supplier 外键冲突
  405001 = Formula 生成输入校验错误
```

### 4.4 分页规范

```
Query 参数:
  page      (默认: 1, min: 1)
  pageSize  (默认: 20, min: 1, max: 100)
  sort      (默认: "id", 格式: "field" 或 "-field" 表示 DESC)
  search    (名称/别名字段模糊搜索)
  filter    (JSON 编码的多条件过滤对象)

示例:
  GET /api/v1/materials?page=2&pageSize=20&sort=-create_time&search=curcumin&filter={"type":"extract","safety.compliance_status":"approved"}
```

---

## 5. 开发路线图

### Phase 1 (P0) — 核心数据 + 配方生成

**周期**: 6-8 周 | **重点**: 原料数据库, 健康问题数据库, 基础配方生成

#### 任务拆解

| # | 任务 | 估算 | 依赖 |
|---|------|------|------|
| P0.1 | 项目脚手架 (NestJS + Prisma + Docker) | 2天 | — |
| P0.2 | Prisma schema 19 张表 | 2天 | P0.1 |
| P0.3 | 公共基础设施 (DTOs, filters, guards, interceptors) | 3天 | P0.1 |
| P0.4 | Auth 模块 (JWT + RBAC) | 3天 | P0.3 |
| P0.5 | Material 模块 — 6 个子实体 CRUD | 5天 | P0.2, P0.3 |
| P0.6 | Health 模块 — 4 个子实体 CRUD | 4天 | P0.2, P0.3 |
| P0.7 | Health-Material 匹配服务 | 2天 | P0.5, P0.6 |
| P0.8 | Formula base CRUD | 2天 | P0.5, P0.6 |
| P0.9 | Formula 生成器服务 (从 health + people + country 自动生成) | 5天 | P0.7, P0.8 |
| P0.10 | Formula 原料调整 (手动编辑) | 2天 | P0.9 |
| P0.11 | Material 和 Health 搜索 (FULLTEXT) | 2天 | P0.5, P0.6 |
| P0.12 | P0 模块单元 + 集成测试 | 3天 | P0.5-P0.11 |
| P0.13 | Docker Compose 开发环境 | 1天 | P0.1 |

**交付物**:
- 可运行的 API 服务 (auth, material CRUD, health CRUD, formula generation)
- Docker Compose 本地开发环境
- P0 模块测试覆盖率 ≥ 80%
- API 文档 (Swagger)

**验收标准**:
- [ ] 能通过 JWT auth CRUD 全部 6 个 material 子实体
- [ ] 能 CRUD 全部 4 个 health 子实体
- [ ] 能按名称/别名/功效模糊搜索 material (≤2s)
- [ ] 能从 (health_id, target_people, target_country) 自动生成配方
- [ ] 能手动调整配方原料和剂量
- [ ] Health-Material 匹配返回相关原料
- [ ] 所有端点响应 ≤2s
- [ ] 所有变更捕获审计日志
- [ ] PII 字段静态加密

### Phase 2 (P1) — 法规数据库 + 跨模块查询

**周期**: 3-4 周 | **重点**: 法规模块, 合规校验, 跨模块聚合

| # | 任务 | 估算 | 依赖 |
|---|------|------|------|
| P1.1 | Law 模块 — 3 个子实体 CRUD | 4天 | P0.2, P0.3 |
| P1.2 | Law-Material 合规校验服务 | 3天 | P1.1, P0.5 |
| P1.3 | Formula 合规集成 (校验配方是否符合法规) | 3天 | P1.2, P0.9 |
| P1.4 | 跨模块聚合 API | 2天 | P0.5-P0.9, P1.1 |
| P1.5 | 高级多条件搜索 (组合过滤) | 3天 | P0.11 |
| P1.6 | Meilisearch 集成 (如 FULLTEXT 不足) | 3天 | P1.5 |
| P1.7 | P1 模块测试 | 2天 | P1.1-P1.6 |

**交付物**:
- Law CRUD + 合规校验
- Formula 合规验证
- 高级多条件搜索 + 聚合
- Meilisearch (如需要)

**验收标准**:
- [ ] 能 CRUD law, law-material, law-update
- [ ] 合规校验验证配方成分是否符合目标国法规
- [ ] 跨模块查询: material → 健康问题 → 推荐配方
- [ ] 多条件搜索: 按类型 + 功效 + 合规状态 + 国家过滤
- [ ] 所有 P1 端点 ≤2s

### Phase 3 (P2) — 知识管理、批量操作、管理后台、加固

**周期**: 4-5 周 | **重点**: 书籍记录, 导入导出, 权限, 备份

| # | 任务 | 估算 | 依赖 |
|---|------|------|------|
| P2.1 | Book 模块 — 3 个子实体 CRUD | 3天 | P0.2, P0.3 |
| P2.2 | 知识关联服务 (书籍 ↔ 原料/健康) | 2天 | P2.1, P0.5 |
| P2.3 | Excel 批量导入 (所有模块) | 4天 | P0.5-P0.9, P1.1 |
| P2.4 | Excel 批量导出 (所有模块) | 3天 | P0.5-P0.9, P1.1 |
| P2.5 | PDF 配方报告生成 | 3天 | P0.9 |
| P2.6 | Word 配方报告生成 | 2天 | P0.9 |
| P2.7 | 导出时数据脱敏 | 1天 | P2.4 |
| P2.8 | 角色管理后台 (admin API) | 3天 | P0.4 |
| P2.9 | 自动备份脚本 + 恢复流程 | 2天 | P0.1 |
| P2.10 | 生产部署 (Docker Swarm) + 监控 | 3天 | All P0/P1/P2 |
| P2.11 | 核心流程 E2E 测试 | 2天 | P2.1-P2.8 |
| P2.12 | 负载测试 (k6 scripts) | 2天 | P2.10 |

**交付物**:
- 书籍知识管理 + 交叉引用
- 批量导入导出 (Excel)
- PDF 和 Word 报告生成
- 完整 RBAC 管理
- 自动备份/恢复
- 生产部署 + 监控

**验收标准**:
- [ ] 能 CRUD 书籍、记录、知识关联
- [ ] Excel 导入 1000+ material 记录 <30s
- [ ] 能导出过滤数据到 Excel/PDF/Word
- [ ] 导出 PII 按角色脱敏
- [ ] Admin 能管理用户和角色
- [ ] 每日备份自动运行, 恢复已测试
- [ ] 系统支持 50 并发用户 p95 ≤2s

---

## 6. 风险与缓解

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|----------|
| **配方生成复杂度** — 算法可能需要大量领域知识 | 高 | 中 | 先从规则匹配起步 (health→material 通过 `t_health_material`), 与领域专家迭代; 保持算法可插拔 |
| **模糊搜索性能** — FULLTEXT 在 100K+ material 时可能太慢 | 中 | 低 | Phase 2 包含 Meilisearch 作为后备; 在 10K 和 50K 行时基准测试 |
| **Prisma 迁移冲突** — 团队开发时 schema 变更 | 中 | 中 | CI 中强制执行 `prisma migrate dev`; 禁止手动编辑迁移; 用 `prisma migrate resolve` 处理冲突 |
| **Excel 导入数据质量** — 用户上传文件可能格式错误 | 高 | 高 | DB 写入前校验每个单元格; 报告行级错误; 预览模式 |
| **法规数据准确性** — 法规记录必须保持最新 | 高 | 高 | `t_law_update` 表设计为版本化; 添加 `is_current` 标记; 季度审查提醒 |
| **密钥轮换** — .env 中的加密密钥 | 中 | 中 | 生产用 Docker secrets; 记录密钥轮换流程; 每环境独立密钥 |
| **MySQL 连接限制** — 高负载下 Prisma 连接过多 | 中 | 低 | 配置连接池 (`connection_limit=20`); 用 Prisma 内置池; Prometheus 监控 |

---

## 7. 任务依赖图

```
Wave 1 (立即开始):
├── P0.1: 项目脚手架 (2天)
└── P0.13: Docker Compose 配置 (1天)

Wave 2 (Wave 1 后):
├── P0.2: Prisma schema (2天)
├── P0.3: 公共基础设施 (3天)
└── P2.9: 备份脚本 (可独立开始) (2天)

Wave 3 (Wave 2 后 — 并行模块开发):
├── P0.4: Auth 模块 (3天)
├── P0.5: Material 模块 (5天)
└── P0.6: Health 模块 (4天)

Wave 4 (Wave 3 后):
├── P0.7: Health-Material 匹配 (2天)
├── P0.11: 搜索 (2天)
└── P1.1: Law 模块 (4天) — P0.2+P0.3 完成后即可开始

Wave 5 (Wave 4 后):
├── P0.8: Formula base CRUD (2天)
├── P0.9: Formula 生成器 (5天) — 依赖 P0.7
└── P1.2: 合规校验 (3天) — 依赖 P1.1+P0.5

Wave 6 (Wave 5 后):
├── P0.10: Formula 调整 (2天)
├── P1.3: Formula 合规集成 (3天)
├── P1.4: 跨模块聚合 API (2天)
└── P1.5: 高级搜索 (3天)

Wave 7 (Wave 6 后):
├── P0.12: P0 测试 (3天)
├── P1.6: Meilisearch (如需要) (3天)
├── P1.7: P1 测试 (2天)
├── P2.1: Book 模块 (3天)
└── P2.5+P2.6: PDF/Word 报告 (5天)

Wave 8 (Wave 7 后):
├── P2.2: 知识关联 (2天)
├── P2.3: Excel 导入 (4天)
├── P2.4: Excel 导出 (3天)
├── P2.8: 角色管理 (3天)
└── P2.7: 数据脱敏 (1天)

Wave 9 (最终):
├── P2.10: 生产部署 (3天)
├── P2.11: E2E 测试 (2天)
└── P2.12: 负载测试 (2天)

关键路径: P0.1 → P0.2 → P0.5 → P0.7 → P0.9 → P0.10 → P0.12 → P2.10
并行加速: ~40% vs 串行 (18 周 → 11 周)
```

---

## 8. 提交策略

**原子提交**, 遵循 Conventional Commits:

```
feat(material): add material base CRUD endpoints
feat(material): add material supplier sub-entity
feat(material): add material effect sub-entity
feat(health): add health base CRUD endpoints
feat(health): add health-material matching service
feat(formula): add formula generator service
feat(auth): add JWT authentication module
feat(auth): add RBAC guards
feat(search): add FULLTEXT search for materials and health
refactor(common): extract pagination DTO to shared module
test(material): add unit tests for material service
test(formula): add integration tests for formula generator
```

**分支策略**:
- `main` — 稳定, 可部署
- `develop` — 集成分支
- `feat/{module}-{feature}` — 功能分支
- Squash-merge 到 develop; 禁止直接提交 main

---

*本方案由 Plan Agent 基于完整需求分析生成, 可直接指导开发执行。*
