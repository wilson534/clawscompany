# OPC（One-Person Company）

OPC 是一个面向独立开发者的一人公司操作系统前端 Demo。当前阶段重点验证“总部大楼 -> 核心办公室 -> Agent 档案 -> A2A 协作 -> 旗舰项目链路”的可运行闭环，并逐步接入真实的 agent runtime。

## 当前仓库包含

- `frontend/`：Next.js 前端 Demo
- `scripts/`：用于生成或整理办公室实例的辅助脚本
- `opc-frontend-architecture.md`：页面结构与优先级
- `opc-frontend-implementation.md`：路由、组件树与 schema
- `opc-mock-data-spec.md`：mock 数据规范
- `opc-open-source-adoption.md`：外部复用策略
- `opc-pipeline-review.md`：产品与团队匹配分析
- `team-members.md`：团队成员设定

## 本地启动

```bash
cd frontend
npm install
npm run dev
```

默认访问地址为 [http://localhost:3000](http://localhost:3000)。

## 当前上传策略

本仓库首版仅保留有复用价值的源码、脚本和产品文档，不提交以下内容：

- `node_modules`、`.next` 等构建产物
- `_refs/` 下的参考仓库副本
- 本地调试日志
- 评审截图、过程稿、压缩包和 PDF 资料
