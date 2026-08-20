# TypeScript 学习项目

> 面向有 Java 后端基础 + Python 经验的学习者，从浅入深学 TS 前端。

## 环境要求
- Node.js v24+（已安装）
- npm（已安装）

## 快速开始
```bash
npm install        # 安装 TypeScript
npm run 01         # 编译并运行第 01 课（hello）
npm run watch      # 监听模式自动编译
```

## 目录结构
```
src/
  ├── 01-basics/      # 阶段一：核心类型
  ├── 02-advanced/    # 阶段二：interface/type/结构化类型
  ├── 03-generics/    # 阶段三：类型收窄 + 泛型
  └── 04-gymnastics/  # 阶段四：类型体操（可选）
```

## 学习进度
- [x] 搭建环境
- [x] 阶段一：核心类型（01-hello, 02-types）
- [x] 阶段二：interface / type / 结构化类型 / 类型收窄（03, 04）
- [x] 阶段三：类型收窄 + 泛型 + 内置工具类型（05, 06）
- [x] 阶段四：类型体操 + 内置工具类型（07）
- [x] 阶段五：Vue3 + React 框架了解（08, 09）

## 各课速查
| 命令 | 主题 | Java 对照 |
|------|------|-----------|
| `npm run 01` | Hello + 基础类型 | 基本类型 |
| `npm run 02` | 数组/对象/函数/联合类型 | 数组/方法/多态 |
| `npm run 03` | interface/type/结构化类型 | interface/类 |
| `npm run 04` | 类型收窄/判别式联合 | sealed interface 模式匹配 |
| `npm run 05` | 泛型 | Java 泛型 |
| `npm run 06` | 内置工具类型 | DTO/不可变类 |
| `npm run build` | 类型体操（纯类型验证） | 泛型高级用法 |
