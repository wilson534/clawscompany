# OPC Open-Source Adoption

## 比赛速胜版开源借力方案

本文件用于回答 4 个问题：

1. 当前比赛版到底要借哪些外部项目
2. 每个项目借到哪一层，不借哪一层
3. 外部能力进入 OPC 后如何重新映射成统一 schema
4. 怎样保证最后展示出来的是 OPC，而不是几个仓库的拼装

## 一句话结论

当前阶段按 `黑客松速胜 + 激进复用` 执行：

- 借现成的壳和表达
- 借成熟的协作语义和 skills 组织方式
- 借多平台读取入口和赛前信号准备工具
- 不借别人对产品的定义
- 不让任何外部项目替代 OPC 自己的主叙事、核心 schema 和差异化办公室

## 借力总原则

- 外部项目只负责加速，不负责定义 OPC 是什么。
- 所有外部输入进入系统后，一律映射成 OPC 自己的 `Office / AgentProfile / Project / Artifact / CollaborationEdge / TeamMemberContext / WorkspaceContext`。
- 比赛现场不依赖 live crawling；所有外部数据源都必须有预制 fallback。
- 如果某个外部实现接入后让页面像“多项目拼装”，就立刻降级为只借思路，不继续接实现。

## 分层借力策略

### 1. 视觉舞台层

主要借鉴：

- `Star-Office-UI`

定位：

- HQ 与办公室的视觉底板
- 楼层表达、像素办公室、角色待机/工作氛围、空间叙事

不负责：

- Founder cockpit
- Team Office
- A2A handoff 语义
- Artifact / Observability

在 OPC 中的角色：

- 作为 `HQ / Office Scene Shell`
- 快速建立“这是一家公司”的第一眼舞台感

### 2. 经营驾驶舱层

主要借鉴：

- `mission-control`

定位：

- Founder Office 的 dashboard 组织方式
- 指标卡、经营摘要、节奏面板、决策密度

不负责：

- 普通办公室页面
- Agent 档案
- 任务语义层

在 OPC 中的角色：

- 只服务 Founder Office
- 与像素办公室融合成深色 cockpit，而不是全站套 dashboard 风格

### 3. A2A / 协作语义层

主要借鉴：

- `ClawTeam`

定位：

- leader + specialized agents + real-time coordination 的组织逻辑
- 依赖、交接、状态推进和跨角色协作的语义来源

不负责：

- 直接提供前端 UI
- 直接决定 OPC 的页面结构

在 OPC 中的角色：

- 映射成前端里的 `handoff / review / escalation / sync`
- 驱动 `CollaborationEdge`、A2A overlay、任务状态和依赖关系

### 4. 角色 / 技能 / 工作流模板层

主要借鉴：

- `agency-agents`
- `gstack`
- `MiniMax skills`

定位：

- Agent persona、workflow、deliverables、success metrics
- CEO / Founder 视角下的问题重构与审批节奏
- skills / tools / plugins 的能力库来源

在 OPC 中的角色：

- 生成 `Agent Profile + skills + tools + plugins + mission + outputs`
- 丰富 Team Office、Founder Office、产品投资部和 Agent Profile 的结构

### 5. 信号读取与赛前数据准备层

主要借鉴：

- `Agent-Reach`
- `MediaCrawler`

定位：

- `Agent-Reach`：多平台统一读取入口与搜索思路
- `MediaCrawler`：赛前离线抓取和信号补强思路

在 OPC 中的角色：

- 情报部、增长部、外交部的来源层参考
- 现场只展示结构化结果，不把 live crawling 变成演示依赖

### 6. OPC 自研层

这些必须由 OPC 自己掌控：

- HQ 主叙事
- Team Office
- Founder Office 的决策逻辑
- Agent Profile 的统一信息架构
- Project / Artifact / Observability 的统一 schema
- 工时 / 工资 / 周报助手的完整闭环演示

## 每个项目的实际定位

| 项目 | 在 OPC 里的定位 | 复用层级 | 进入方式 |
| --- | --- | --- | --- |
| `Star-Office-UI` | 视觉底板与场景母版 | 高 | `visual adapter` |
| `mission-control` | Founder dashboard 模板来源 | 中 | `visual adapter` |
| `ClawTeam` | 协作逻辑与部门协同模板 | 中 | `workflow semantics adapter` |
| `agency-agents` | 角色档案模板 | 中低 | `profile adapter` |
| `gstack` | CEO / Founder 节奏与工作流逻辑 | 中低 | `workflow semantics adapter` |
| `MiniMax skills` | skills / tools / plugins 能力库来源 | 高 | `skill catalog adapter` |
| `Agent-Reach` | 多平台信号入口参考 | 中 | `signal source adapter` |
| `MediaCrawler` | 赛前离线数据补充器 | 低 | `offline signal prep` |

## 统一适配层

外部项目进入 OPC 时一律经过适配层，不直接成为真源：

- `visual adapter`
  - 把外部场景表达和面板样式映射进 OPC 的房间结构
- `skill catalog adapter`
  - 把外部 skills / tools / plugins 映射成 OPC 的 `Skill` 与 `ToolPlugin`
- `signal source adapter`
  - 把多平台读取结果映射成 OPC 的 `Signal / TrendCluster / OpportunityCandidate`
- `workflow semantics adapter`
  - 把外部协作模型映射成 OPC 的 `AgentTask / CollaborationEdge / DecisionMemo`
- `profile adapter`
  - 把角色模板映射成 OPC 的 `AgentProfile`

## 工程落地顺序

1. 先借 `Star-Office-UI + mission-control` 快速定出 HQ 和 Founder 的视觉壳。
2. 把现有文档里的 schema 固化成前端单一真源。
3. 把 `ClawTeam + agency-agents + MiniMax skills` 翻译成 UI 可展示的数据层。
4. 把 `Agent-Reach` 和赛前准备的数据包接成情报部来源。
5. 补齐 Team Office、Founder 决策、Agent Profile、Artifact、Observability 这些 OPC 自己的差异化层。
6. 最后统一 Demo 主链：`HQ -> Founder -> Team -> Intel -> Investment -> Engineering -> Release -> Agent Profile -> Artifact`。

## 验收标准

- 任意页面都不能让人明显感觉是三个不同项目直接拼起来。
- A2A 飞线必须映射到真实任务和真实 artifact，而不是纯动画。
- Founder Office 必须显著强于普通办公室，像真正的决策中枢。
- Team Office 必须体现你们四个人是真实输入源，而不是展示层装饰。
- 现场演示不因外部平台抓取失败而中断。
- 最终展示出来的是 OPC 的创业执行系统，而不是“集成了很多开源项目”的说明会。

## 当前阶段默认结论

- 当前阶段优先速胜，不按长期产品化最优做取舍。
- 当前阶段允许高强度吸收外部视觉表达和代码结构。
- 当前阶段仍由 OPC 自己掌控核心 schema、主叙事和差异化办公室。
- 赛后如果继续产品化，需要再做一轮“去外部壳、收敛依赖、清许可边界”的重构计划。
