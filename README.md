# ECHOT 电商情报站

<p align="center">
  <b>面向国内电商操盘手与服务商的高信噪比行业情报站。</b><br>
  自动采集平台规则、垂媒资讯与生态动态，经大模型去水筛选、独立双评分、事件归组与热度排行，每日 08:00 自动出刊《电商日报》。
</p>

## 定位与读者

- **聚焦领域**：国内电商平台生态（淘宝/天猫、抖音电商、拼多多、京东、小红书电商、微信小店/视频号、快手电商、美团闪购、1688 及相关产业带供应链）。
- **核心读者**：品牌方/卖家操盘手、电商服务商/SaaS/MCN 从业者。
- **内容原则**：压制纯品牌公关软文、卖课招商广告、消费者单品导购与无据传言；仅展示事实摘要与原文链接，不全文搬运原文。

## 工作流与目录结构

每条采集进来的资讯都会经过：**采集去重 → 相关性预筛 → 独立双评分 → 结构化与摘要写作 → 事件聚类与热度排行 → 定时成刊（日报 / 周报 / 月报）**。

| 目录 | 作用 |
|---|---|
| [`industry/`](industry/) | 国内电商行业配置：`taxonomy.ts`（分类/标签/平台主体）、`topics.json`（36 个主题目录）、`sources.json`（信源配置）、`selection.ts`（入选门槛）、`wording.ts`（禁用夸张词）、`prompts/`（各步骤提示词） |
| [`site/`](site/) | 站点品牌与文案：`site.ts`（站名/文案/出刊时间）、`models.ts`（模型预设）、`brand/`（Logo 与报头 SVG）、`pages/`（使用规则与隐私说明）、`public/`（`robots.txt`/`manifest.webmanifest`/`openapi-v1.json`） |
| [`apps/`](apps/) | 运行进程：`apps/api`（Fastify 接口）、`apps/worker`（采集/分析/成刊后台）、`apps/web`（React Router SSR 网页） |
| [`packages/`](packages/) | 核心引擎：`packages/contracts`（共享契约）、`packages/backend`（采集、评审、聚簇、统一读取与发布层） |

## 支持的信源与公开出口

- **六种信源接入**（在 `industry/sources.json` 或 `/admin/sources` 管理）：`rss`、`web_list`、`json_list`、`mp_account`（微信公众号，需 `DAJIALA_KEY`）、`x_search`（X 账号，需 `SOCIALDATA_API_KEY`）、`external`（外部脚本通过 `POST /api/ingest/items` 推送，需 `INGEST_TOKEN`）。
- **多端消费出口**：
  - 网站浏览：`/`（每日精选）、`/all`（全部动态）、`/hot`（48 小时热点榜）、`/daily` / `/weekly` / `/monthly`（日报/周报/月报）、`/topics`（主题页）
  - 订阅与程序接入：`/feed.xml` 等 RSS 订阅、`/api/v1/*` 公开 REST API（说明见 `/openapi-v1.json`）、`/api/v1/agent`（Agent Markdown 入口）、`/api/mcp`（Streamable HTTP MCP 服务）

## 本地 Docker 快速启动

环境要求：Docker / Docker Compose、Node.js 24+。

```bash
# 1. 生成本地 .env（自动创建随机管理员密码与会话密钥，勿提交到 Git）
node scripts/init-env.ts --llm-key <你的模型 API Key>

# 2. 按需补充 .env 中的 LLM_BASE_URL / LLM_MODEL / DAJIALA_KEY / EMBEDDING_*

# 3. 启动 PostgreSQL、迁移初始化、API、Worker 与 Web
docker compose up -d --build
```

启动后访问：
- 前台页面：<http://localhost:3000>
- 管理后台：<http://localhost:3000/admin>（密码见 `.env` 中的 `ADMIN_PASSWORD`）
- 冒烟检查：`node scripts/smoke.ts --base http://localhost:3000`

## 开发与检查

```bash
npm install
npm run typecheck
npm run test:standalone
npm run build -w @aihot/web
```

## 运营信息与开源许可

- **运营主体**：咖飞
- **联系方式**：微信 `z-begun`
- **开源许可**：代码遵循 [MIT License](LICENSE)，引擎底层基于开源项目 [`KKKKhazix/AIHOT`](https://github.com/KKKKhazix/AIHOT) 构建；`ECHOT` 及 `AIHOT` 各自的名称与 Logo 标识不在代码许可范围内。
