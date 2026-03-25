# Skills Bay - AI Skills Marketplace on TON

一个基于 TON 区块链的 AI 技能市场，通过 Telegram Mini App 提供便捷的技能购买和使用体验。

## 项目简介

Skills Bay 是一个创新的 AI 技能交易平台，用户可以通过 TON 支付购买各种 AI 技能服务。项目采用 Telegram Mini App 形式，提供无缝的 Web3 支付体验。

## 技能详细配置方案

### Skill A: 全球每日新闻 Top 10 (Daily News Insights)

- **功能逻辑**：每日抓取路透社、美联社等主流媒体的头条，利用 AI 进行去重、翻译并提炼核心摘要。
- **演示点**：强调"信息降噪"。用户不需要在几十个频道里刷消息，只需一键获得全球局势。
- **入参 ID**：`skill_news_001`

### Skill B: 智能天气管家 (Smart Weather & Umbrella)

- **功能逻辑**：接入高精度气象 API（如 OpenWeather），预测未来 15 天。AI 会自动判断降水概率，并给出具体的带伞建议（例如："周三 14:00-16:00 有阵雨，建议携带长柄伞"）。
- **演示点**：强调"决策辅助"。它不是冷冰冰的数据，而是人性化的生活助理。
- **入参 ID**：`skill_weather_002`

### Skill C: 极客技术热点 (Tech Trends Weekly)

- **功能逻辑**：扫描 GitHub Trending、Hacker News 以及顶级科技大厂（如 OpenAI, Google）的博客，总结出当前最火的 10 个技术点。
- **演示点**：强调"专业深度"。面向开发者和极客，解决"技术焦虑"。
- **入参 ID**：`skill_tech_003`

## 技术架构

### 1. Frontend (Telegram Mini App)
- 负责展示 Skill 详情、价格，并通过 `ton-connect` 调用钱包。

### 2. Backend (Django/Python)
- 验证支付状态（通过访问 TON 区块链浏览器 API 或接收支付回调）
- 管理用户权限数据库（User ID <-> Skill ID 映射）

### 3. Bot Engine
- 根据数据库权限，决定是否响应用户的 AI 指令

## 核心交互流程 (The User Journey)

### Step 1: 技能发现 (Discovery)
用户在主 Bot 界面看到三个 Skill 选项。点击后，Bot 发送一个带有 Inline Keyboard（内联按钮）的消息。

### Step 2: 参数化跳转 (Deep Linking)
按钮不只是简单的网页链接，而是带有 `startapp` 参数的 Telegram Mini App (TMA) 链接。

**技术细节**：使用 `https://t.me/YourBot/appname?startapp=skill_id_001`。这样用户点击进入网页（Mini App）时，网页后端能立刻识别出用户是想购买哪一个具体技能。

### Step 3: 无缝支付 (Seamless Payment)
在内嵌网页内完成支付。

- **推荐方案**：使用 TON 支付（连接 Telegram 钱包或 Tonkeeper）
- **合规方案**：如果是数字商品，也可以集成 Telegram Stars

### Step 4: 能力激活 (Activation)
支付成功后，网页通过 `Telegram.WebApp.close()` 关闭或通过 Webhook 通知 Bot 后端。此时 Bot 主动推送一条消息："支付成功！您已解锁 [Skill Name]，现在可以直接发送指令使用了。"

## 演示重点：为什么要"内嵌网页"而不是"直接对话支付"？

评审可能会问：既然都在 TG 里，为什么不直接在对话框里发 Invoice（账单）？你的回答理由（加分项）：

- **体验升级**：网页可以展示更丰富的 AI 技能介绍（动图、视频、案例），比纯文字对话更有说服力。
- **灵活性**：网页可以方便地接入各种 Web3 钱包（如 Tonkeeper），符合你们 Web3 票松的主题。
- **扩展性**：以后如果要做"组合套餐"或者"限时促销"，网页 UI 的调整比修改 Bot 指令要快得多。

## 项目特点

- ✅ 基于 TON 区块链的去中心化支付
- ✅ Telegram Mini App 无缝集成
- ✅ 支持多种 AI 技能服务
- ✅ 用户友好的购买流程
- ✅ 实时支付验证和权限管理

## 如何使用

### 安装依赖
```bash
npm install
```

### 本地开发
```bash
npm start
```

### 构建生产版本
```bash
npm run build
```

## 技术栈

- React + TypeScript
- Material-UI
- TON Connect
- Telegram Mini App SDK

## License

MIT
