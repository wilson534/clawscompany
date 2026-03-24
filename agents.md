# agents.md

## 项目定位

- 项目名称：OPC（One-Person Company）
- 当前目标：构建一个面向独立开发者的一人公司操作系统前端 Demo，并逐步接入真实的 agent runtime
- 当前重点：先把总部大楼、核心办公室、Agent 档案、A2A 协作、旗舰项目链路跑通

## 语言

- 所有对话、注释、文档、commit message 使用中文。
- 代码中的变量名、函数名使用英文。
- 用户可见的 print 和 log 使用中文。

## 开发方式

- 先规划再动手。
- 每次开始一个新模块前，先明确目标、输入、输出、依赖和验收标准。
- 开发过程中必须走 Ralph loop：每完成一个可运行增量，就立刻做一轮真实集成验证、看结果、修正，再进入下一轮；不要闷头连续实现很久后再一次性联调。
- 默认优先做最小可运行闭环，再逐步补细节，不先做大而全。

## 测试策略

- 默认只做 integration test，不做 unit test。
- 验收以真实模块联动结果为准，不用 mock 驱动结论。
- 前端页面验收要尽量使用真实页面跳转、真实 mock 数据、真实组件联动来判断，而不是只看静态截图。
- 如果某个模块暂时只能用 mock 数据，也必须保证数据结构和后续真实 runtime 接口兼容。

## 可观测性

- 每个模块都必须有业务层 JSON。
- 业务层 JSON 用于表达模块输入、关键中间结果、输出和错误状态，便于联调、排查和验收。
- 每个模块都必须有系统级 log。
- 系统级 log 至少记录模块启动、关键调用、耗时、异常、重试、降级和最终状态。

## 前端约束

- 前端页面必须围绕“公司正在运转”这个核心叙事组织，不要退化成普通 dashboard。
- 每个办公室至少要有一个主模块、一个可点击 Agent、一个任务状态区域。
- 每个 Agent 都应支持查看 profile、skills、tools、plugin、协作关系和当前任务。
- A2A 协作可视化必须是全局能力，不只属于某一个办公室。
- Founder Office 必须能看到跨办公室摘要并做决策，不只是展示酷炫指标。
- Team Office 必须是上下文输入层，不只是成员介绍页。

## 数据与接口约束

- 所有前端 mock 数据都要遵循统一 schema。
- 业务实体、字段定义和类型结构以 `opc-frontend-implementation.md` 为准。
- 新增字段时优先补 schema，再补页面逻辑，避免各模块各自发明数据结构。
- 模块之间传递的信息优先结构化，不依赖长段自由文本。

## 设计与资产约束

- 当前若采用比赛速胜版外部借力，开源复用层级、适配层和阶段性策略以 `opc-open-source-adoption.md` 为准。
- 外部项目可以提供视觉壳、skills、workflow 语义和赛前数据准备能力，但不能替代 OPC 自己的主叙事和统一 schema。
- 人物 IP 要鲜明、可识别，但整体风格要统一，避免不同办公室像不同项目拼起来的。

## 交付优先级

- P0 / P1 / P2 的详细优先级以 `opc-frontend-architecture.md` 为准。

## 文档同步

- 架构变化时，同步更新相关文档。
- 至少维护以下文档的一致性：
  - `opc-open-source-adoption.md`
  - `opc-pipeline-review.md`
  - `opc-frontend-architecture.md`
  - `opc-frontend-implementation.md`
  - `opc-mock-data-spec.md`
  - `team-members.md`
- 其中默认真源划分如下：
  - 开源借力与外部复用策略：`opc-open-source-adoption.md`
  - 产品与团队匹配结论：`opc-pipeline-review.md`
  - 页面结构与优先级：`opc-frontend-architecture.md`
  - 路由、组件树与 schema：`opc-frontend-implementation.md`
  - mock 目录与样例数据：`opc-mock-data-spec.md`

## 默认工作原则

- 优先保持设计贴合团队长板，而不是盲目追求通用性。
- 优先证明“选题 -> 立项 -> 开发 -> 上架准备 -> 增长/合作”闭环成立。
- 优先保证真实联动和可讲述性，再补完美抽象。
- 发现设计和团队优势不匹配时，优先调整设计，不强行扩功能。
