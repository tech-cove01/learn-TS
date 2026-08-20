/**
 * 阶段二：04 —— 类型收窄（Type Narrowing）与判别式联合
 *
 * 运行：npm run 04
 *
 * 这是 TS 最实用的技能之一，也是你 agent 项目里
 * 处理各种 Message 类型时的核心写法。
 */

// ===== 1. 什么是类型收窄 =====
// 联合类型在运行时无法确定具体是哪个，TS 会根据判断自动"收窄"范围
type Status = "success" | "error" | "pending";

function handleStatus(s: Status): string {
  // 没收窄前，s 是 "success" | "error" | "pending"
  if (s === "success") {
    // 收窄后，这里 s 确定是 "success"
    return "✅ 成功";
  }
  if (s === "error") {
    // 这里 s 确定是 "error"
    return "❌ 失败";
  }
  return "⏳ 处理中"; // 这里 TS 推断 s 只能是 "pending"
}
console.log(handleStatus("success"));

// ===== 2. typeof 收窄 =====
function printValue(v: string | number | boolean): void {
  // typeof 是 JS 自带的类型判断，TS 能识别并收窄
  if (typeof v === "string") {
    console.log("字符串：" + v.toUpperCase());
  } else if (typeof v === "number") {
    console.log("数字：" + v.toFixed(2));
  } else {
    console.log("布尔：" + v);
  }
}
printValue("hello");
printValue(3.14159);
printValue(true);

// ===== 3. 判别式联合（Discriminated Union）—— agent 项目的核心模式 =====
// 用共同的"判别字段"（通常是 type/role）来区分不同的联合成员
// Java 对应：sealed interface + 模式匹配

interface UserMessage {
  type: "user"; // 判别字段
  role: "user";
  content: string;
}
interface AssistantMessage {
  type: "assistant"; // 判别字段
  role: "assistant";
  content: string;
  // assistant 消息有额外字段
  toolCalls?: ToolCall[];
}
interface ToolResultMessage {
  type: "tool_result"; // 判别字段
  toolName: string;
  result: string;
}

interface ToolCall {
  name: string;
  args: Record<string, unknown>;
}

// 联合类型：消息只能是这三种之一
type Message = UserMessage | AssistantMessage | ToolResultMessage;

// 处理函数：用 type 字段自动收窄
function renderMessage(msg: Message): string {
  // 关键点：msg.type 就是"判别字段"
  switch (msg.type) {
    case "user":
      // 这里 TS 自动把 msg 收窄成 UserMessage
      return `👤 ${msg.role}: ${msg.content}`;
    case "assistant":
      // 这里自动收窄成 AssistantMessage，能访问 toolCalls
      const calls = msg.toolCalls?.map((t) => t.name).join(", ") ?? "无";
      return `🤖 ${msg.content}（工具调用：${calls}）`;
    case "tool_result":
      // 这里自动收窄成 ToolResultMessage
      return `🔧 工具 ${msg.toolName} 返回: ${msg.result}`;
  }
}

const messages: Message[] = [
  { type: "user", role: "user", content: "你好" },
  { type: "assistant", role: "assistant", content: "我在", toolCalls: [{ name: "search", args: { q: "ts" } }] },
  { type: "tool_result", toolName: "search", result: "找到了 10 条结果" },
];
messages.forEach((m) => console.log(renderMessage(m)));

// 对比 Java：这等价于
// sealed interface Message
// record UserMessage(...) implements Message
// switch 模式匹配 -> case UserMessage u -> ...

// ===== 4. 类型守卫（自定义收窄）is =====
// 当内置判断不够时，可以用 is 关键字写自定义守卫
function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((item) => typeof item === "string");
}

function test(v: unknown): void {
  if (isStringArray(v)) {
    // 这里 v 被收窄为 string[]
    console.log("字符串数组，长度", v.length);
  } else {
    console.log("不是字符串数组");
  }
}
test(["a", "b"]);
test([1, 2]);

export {};
