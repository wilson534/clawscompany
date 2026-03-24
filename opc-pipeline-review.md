# OPC Pipeline Review

## 基于团队长板的设计复盘

本文件用于回答 4 个问题：

1. 我们团队真正的长板是什么
2. 当前 OPC 设计是否贴着团队长板搭建
3. 原来的部门应该如何保留
4. 每个 stage / module 分别借鉴了哪个开源项目的哪一部分

## 一句话结论

当前 OPC 的大方向是对的，但如果按“通用 Agent 平台”去做，会削弱你们团队最强的优势。更适合你们的版本应该是：

`一套围绕独立开发者和 iOS 微应用创业而设计的 One-Person Company OS`

它最该强调的不是“什么都能自动化”，而是：

- 会选题
- 会判断什么值得做
- 会快速做出像样的 App
- 会产出可上架的素材和提审包
- 会讲清楚商业化和传播潜力

## 团队长板拆解

| 成员 | 核心长板 | 最适合主导的模块 |
| --- | --- | --- |
| 彭智炜 | AI Agent 创业、产品化叙事、黑客松作战、媒体传播、创业者视角 | Founder 叙事、产品投资部、增长部、外交部、Team Office |
| 张涛 | Agent 算法、开源生态、技术影响力、研究与结构化判断 | 情报部、机会评估、评分体系、Agent 编排、技术可行性评审 |
| Randy Xian（冼星朗） | AI-native 全栈、iOS/App Store 落地、审美表达、极强交付速度 | 设计部、工程部、发行部、旗舰 App 的 UI 与 iOS 产物 |
| 石千山 | Agent 平台、协作工具、高性能工程、前端与系统建设 | 平台基础层、实时状态系统、A2A 协作层、HQ 前端工程、QA/系统稳定性 |

## 团队组合优势

你们不是“单点非常强”的队伍，而是一个非常罕见的复合型组合：

- 有真实创业和产品叙事能力
- 有 Agent 与算法基础
- 有 iOS 端从 0 到 1 做出并上架的经验
- 有平台工程和协作系统建设能力
- 有媒体势能、内容传播和商业想象力

这意味着最适合你们的 OPC 不是：

- 纯研究型 Agent 平台
- 纯前端炫技型可视化 Demo
- 纯自动爬虫系统

而是：

- `会选题 + 会做 App + 会包装上架 + 会展示增长潜力` 的创业执行系统

## 对当前设计的重新 Review

### 哪些地方是对的

- 用“公司部门”来组织前端，而不是抽象 workflow，这是正确的
- 用 Founder Office、Team Office、外交部来建立“这是一家公司”的感觉，这是正确的
- 用像素办公室做 workflow visualization，而不是普通 dashboard，这是正确的
- 选择 iOS 微应用作为旗舰产物，而不是泛 SaaS，这是正确的
- 让每个 Agent 都有 profile、skills、tools、plugin 和实时任务，这是正确的

### 哪些地方需要调整

- 不能把“前沿信息挖掘 -> 自主全栈开发 -> App Store 上架”做成过于粗的 3 段式
- 不能把“全网实时抓取”当作 V1 核心卖点，这不贴你们团队最强优势
- 不能把 Founder Office 只做成炫酷驾驶舱，它必须是决策层
- 不能把 Team Office 只做成介绍页，它必须成为系统上下文输入层
- 不能把整个系统讲成“通用多智能体框架”，那样会稀释你们的创业执行优势

## 保留原部门后的 OPC 组织架构

前端上，原来的部门应该完整保留，并明确成一家公司：

- Founder Office
- Team Office
- 情报部
- 产品投资部
- 设计部
- 工程部
- QA 部
- 发行部
- 增长部
- 外交部

其中：

- Founder Office 负责全局经营视角和拍板
- Team Office 负责注入团队上下文与能力配置
- 其他办公室负责各自的专业执行

## 后台 Pipeline 结构

原来的部门不等于后台 stage。更合理的是：

| Pipeline Stage | 对应部门 | 核心问题 | 为什么贴你们团队长板 |
| --- | --- | --- | --- |
| Stage 0: Team Context | Team Office + Founder Office | 我们是谁、有什么优势、适合打什么仗 | 直接把 4 位成员的背景变成系统输入 |
| Stage 1: Signal Mining | 情报部 | 哪些信号值得关注 | 张涛的结构化判断 + 石千山的数据连接能力最匹配 |
| Stage 2: Opportunity Committee | 产品投资部 + Founder Office | 什么值得立项、为什么现在做 | 彭智炜的产品和创业判断最值钱 |
| Stage 3: App Cell Build | 设计部 + 工程部 + QA 部 | 怎么在最短时间做出可信产品 | Randy 的 iOS 落地 + 石千山的平台与协作层能力 |
| Stage 4: Release Pack | 发行部 | 怎么让它看起来像真的能上架 | Randy 的 App Store 经验和审美表达是关键 |
| Stage 5: Growth / Partner Loop | 增长部 + 外交部 + Founder Office | 怎么证明增长和商业化潜力 | 彭智炜的传播与创业叙事最适合这一段 |

## 结论：当前 Pipeline 是否基于团队优势搭建

结论是：`方向上是，但还需要主动收缩和重排重点，才能真正贴合团队长板。`

如果按照修正后的结构，OPC 会真正建立在你们的优势上：

- Team Context：使用你们真实背景，而不是空白 agent
- Opportunity Committee：强调你们擅长“判断什么值得做”
- App Cell Build：强调你们擅长把想法快速做成 iOS 微应用
- Release Pack：强调你们有真实上架认知
- Growth / Partner Loop：强调你们的传播势能和商业化想象力

如果不做这些修正，它就会更像：

- 任意一支技术团队都能讲的 multi-agent demo

## 每个 Stage 借鉴哪个开源项目的哪一部分

### Stage 0: Team Context / Team Office

主要借鉴：

- `agency-agents`
- `gstack`

借鉴点：

- `agency-agents` 的角色设计方式：每个 agent 不只是一个 prompt，而是有 personality、workflow、deliverables、success metrics 的“专业员工”
- `gstack` 的 `/office-hours` 和 `/plan-ceo-review` 思路：先把问题想清楚，再让 CEO / Founder 视角重构需求

落在 OPC 里的形式：

- Team Office 展示你们 4 个人的 profile、skills、tools、负责模块、个人 context
- Founder Office 能读取 Team Office 的摘要，作为后续决策输入

### Stage 1: Signal Mining / 情报部

主要借鉴：

- `Agent-Reach`
- `MediaCrawler`

借鉴点：

- `Agent-Reach` 的强项是统一平台读取和搜索能力，README 明确写了“Read & search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu — one CLI, zero API fees”
- `MediaCrawler` 的强项是公开信息采集和登录态驱动的多平台抓取思路

在 OPC 中的使用原则：

- `Agent-Reach` 适合借它的多源接入思路和 CLI 工具化思路
- `MediaCrawler` 只能借研究思路，不能作为 V1 的核心生产依赖

原因：

- `MediaCrawler` README 明确写了“本仓库的所有内容仅供学习和参考之用，禁止用于商业用途”

### Stage 2: Opportunity Committee / 产品投资部

主要借鉴：

- `ClawTeam`
- `gstack`

借鉴点：

- `ClawTeam` 的 leader + swarm 结构，README 明确强调“One Command Line: Full Automation”以及 leader orchestrates specialized sub-agents
- `ClawTeam` 还明确提到 `Personalized Investment Committees` 和 `Business Operations Teams`
- `gstack` 的 CEO review 机制可以借来做“问题重构”和“机会评审”

落在 OPC 里的形式：

- 产品投资部不是简单打分，而是模拟一场投资委员会 / 立项会
- Founder Agent 在这里拍板
- 产物是 `Opportunity Brief` 而不是简单的爬虫结果

### Stage 3: App Cell Build / 设计部 + 工程部 + QA 部

主要借鉴：

- `ClawTeam`
- `MiniMax skills`
- `「分裂龙虾」APP工厂.pdf`

借鉴点：

- `ClawTeam` 的多 agent 协作和实时状态更新机制，README 提到 specialized sub-agents、dependency management、real-time coordination、performance monitoring
- `MiniMax skills` 里明确有 `frontend-dev`、`fullstack-dev`、`ios-application-dev`
- `ios-application-dev` 描述里明确覆盖 SwiftUI 和 Apple HIG
- 本地 PDF《分裂龙虾》给了最接近你们产品本身的方法论：从调研到设计、SwiftUI 开发、上架的 App 工厂闭环

落在 OPC 里的形式：

- 每个项目不是被零散地扔给若干 agent，而是由一个 `App Cell` 贯穿推进
- 设计部、工程部、QA 部围绕同一个 App Cell 工作
- 重点做 iOS-first 微应用，而不是泛化全栈产品

### Stage 4: Release Pack / 发行部

主要借鉴：

- `MiniMax skills`
- `从0开始做一个iOS APP：Build on Trae.pdf`
- `gstack`

借鉴点：

- `ios-application-dev` 技能里关于 SwiftUI、导航、safe area、Apple HIG 的规范意识
- 本地《Build on Trae》PDF 里关于 iOS 项目创建、权限配置、模型接入、App Store 流程的实操线索
- `gstack` 的 Think -> Plan -> Build -> Review -> Test -> Ship -> Reflect 过程，让发行不是孤立动作，而是整个 sprint 的自然终点

落在 OPC 里的形式：

- 发行部负责截图、图标方向、标题、副标题、关键词、描述、审核风险、提审 checklist
- V1 结束标准不是“真的上线”，而是“形成完整可提审包”

### Stage 5: Growth / Partner Loop / 增长部 + 外交部

主要借鉴：

- `mission-control`
- `Agent-Reach`
- `gstack`

借鉴点：

- `mission-control` 的强项是“Track revenue, code, social, and growth. All in one dashboard.”
- `Agent-Reach` 的多平台搜索能力适合用于增长和 partner 研究
- `gstack` 的流程化思路适合把 ship 之后的 review、retro、next action 串起来

落在 OPC 里的形式：

- 增长部负责传播策略、social proof、内容包装、潜在增长动作
- 外交部负责 candidate、partner、渠道、合作状态、recommended next action
- Founder Office 汇总增长和 partner 情报，形成经营决策

### HQ 可视化与跨部门协作层

主要借鉴：

- `Star-Office-UI`
- `mission-control`
- `agency-agents`

借鉴点：

- `Star-Office-UI` 的核心价值不是像素风本身，而是把“看不见的工作状态”变成一个“cozy little space with characters, daily notes, and guest agents”
- `mission-control` 给 Founder Office 的公司经营面板提供灵感
- `agency-agents` 给每个角色的身份与行为模式提供结构模板

重要限制：

- `Star-Office-UI` README 明确写了：`Code under MIT; art assets for non-commercial learning only`

所以在 OPC 中的原则是：

- 长期产品化阶段，借空间叙事和交互逻辑，不让外部项目替代 OPC 自己的产品定义
- 当前如果采用比赛速胜版外部借力，则具体复用层级、适配层和阶段性策略以 `opc-open-source-adoption.md` 为准

## 每个部门建议由谁主导

| 部门 | 建议主导人 | 协同人 | 原因 |
| --- | --- | --- | --- |
| Founder Office | 彭智炜 | 张涛 | 更强的创业叙事和产品方向感 |
| Team Office | 彭智炜 | 全员 | 便于统一团队对外画像和内部上下文 |
| 情报部 | 张涛 | 石千山、彭智炜 | 张涛适合做信号结构化和技术判断 |
| 产品投资部 | 彭智炜 | 张涛 | 适合做立项、优先级和产品化判断 |
| 设计部 | Randy | 彭智炜 | Randy 的审美与产品落地感最强 |
| 工程部 | Randy | 石千山、张涛 | Randy 强 iOS 落地，石千山强系统层，张涛补 agent 编排 |
| QA 部 | 石千山 | Randy | 适合从平台与稳定性视角看问题 |
| 发行部 | Randy | 彭智炜 | Randy 强 App Store 实操，彭智炜补对外叙事 |
| 增长部 | 彭智炜 | 张涛 | 更适合传播和 narrative 设计 |
| 外交部 | 彭智炜 | 张涛 | 更适合商业化与合作外联叙事 |

## 最终建议：整个 OPC 最应该突出什么

如果你们要赢，这个项目最该突出的是：

- 这不是一个泛 Agent OS
- 这不是一个爬虫平台
- 这不是一个前端像素玩具

它应该被理解成：

- `一套能把独立开发者背景、市场信号、产品判断、iOS 开发、上架准备和商业化潜力串起来的一人公司操作系统`

真正最贴你们团队长板的卖点排序应该是：

1. Team Context 驱动的创业执行系统
2. Opportunity Committee 驱动的高质量立项
3. iOS-first App Cell 快速落地
4. 可视化的部门协作与 A2A 网络
5. Release Pack 与 Founder 决策闭环
6. Growth / Partner 的 scalable potential

## 需要避免的设计误区

- 不要把 V1 的重点放在“全网实时抓取”
- 不要把重点放在“模型数量很多”
- 不要把重点放在“可以做任何类型的产品”
- 不要让 Founder Office 只有酷炫大屏，没有决策动作
- 不要让 Team Office 只是团队介绍页
- 不要让外交部只是联系人列表

## 可直接用于后续实现的结论

- 原来的部门全部保留
- 后台 pipeline 改成 6 段式
- Team Office 必须升格为系统输入层
- Founder Office 必须升格为决策层
- 情报部和产品投资部必须分开
- 工程主线要明确为 iOS-first 微应用工厂
- Release Pack 和 Growth / Partner Loop 必须单列
