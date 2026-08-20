/**
 * 阶段五：09 —— React + TypeScript 核心用法
 *
 * 说明：真实 React 组件用 .tsx + JSX 语法，这里用纯 TS
 * 演示 React 的类型安全核心，重点看 hooks 的泛型推断和
 * 组件 props 的类型约束。
 *
 * 运行：npm run 09
 */

// ===== 1. useState 的类型推断 =====
// 模拟 React 的 useState
function useState<S>(initial: S): [S, (v: S) => void] {
  let state = initial;
  const setState = (v: S) => {
    state = v;
  };
  return [state, setState];
}

const [count, setCount] = useState(0); // number，自动推断
const [name, setName] = useState(""); // string，自动推断
console.log("React useState 推断:", typeof count, typeof name);

// 泛型显式指定（联合类型状态）
type Status = "idle" | "loading" | "success" | "error";
const [status, setStatus] = useState<Status>("idle");
// setStatus("failed");  // ❌ 不在 Status 联合里
console.log("React useState 泛型:", status);

// ===== 2. 组件 Props 类型（对比 Java 的构造参数/方法参数）=====
// React 组件接收 props，用 interface 定义形状
interface UserCardProps {
  user: {
    id: number;
    name: string;
    avatar?: string; // 可选
  };
  onSelect: (user: { id: number }) => void; // 事件回调，Java 的 FunctionInterface
  children?: ReactNode; // 子节点
}

// ReactNode 简化定义
type ReactNode = string | number | null | undefined;

// 模拟组件渲染逻辑
function UserCard({ user, onSelect }: UserCardProps): string {
  const avatar = user.avatar ?? "默认头像";
  return `卡片：${user.name}（${avatar}），点击选择 id=${user.id}`;
}

// 使用组件
const userCard = UserCard({
  user: { id: 1, name: "Alice" },
  onSelect: (u) => console.log("选中用户 id =", u.id),
});
console.log("React 组件:", userCard);

// ===== 3. 泛型组件：复用逻辑 + 类型安全 =====
// React 常用泛型组件，比如一个通用的"列表加载"组件
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => string; // 渲染函数
}

function GenericList<T>({ items, renderItem }: ListProps<T>): string {
  return items.map(renderItem).join(" | ");
}

// 传入 string 数组，T 推断为 string
const strList = GenericList<string>(
  { items: ["苹果", "香蕉", "橙子"], renderItem: (i) => `🍎${i}` }
);
// 传入对象数组，T 推断为对象类型
const userList = GenericList(
  {
    items: [{ name: "Alice" }, { name: "Bob" }],
    renderItem: (u) => `👤${u.name}`,
  }
);
console.log("泛型组件:", strList);
console.log("泛型组件:", userList);

// ===== 4. useEffect 依赖数组（类型安全）=====
// 模拟
type Effect = () => void | (() => void);
function useEffect(effect: Effect, deps: unknown[]): void {
  console.log("useEffect 注册，依赖数量:", deps.length);
}
useEffect(() => {
  console.log("组件挂载");
}, []);
useEffect(() => {
  // 依赖 status，只有 status 变化才重新执行
}, [status]);

// ===== 5. React 项目中的实战技巧 =====
// 事件处理函数类型
type ChangeEvent = { target: { value: string } };
function handleInputChange(e: ChangeEvent): void {
  console.log("输入:", e.target.value);
}
handleInputChange({ target: { value: "hello" } });

// 常见模式：状态 + 派生值
interface Todo {
  id: number;
  text: string;
  done: boolean;
}
const todos: Todo[] = [];
const [filter, setFilter] = useState<"all" | "active" | "done">("all");
// 根据 filter 过滤（模拟）
const filtered = todos.filter((t) =>
  filter === "all" ? true : filter === "done" ? t.done : !t.done
);
console.log("React 过滤:", filtered.length, "条（当前 filter:", filter + "）");

console.log("React + TS 核心：props 有 interface、hooks 泛型推断、泛型组件复用");

export {};
