/**
 * 阶段三：06 —— 内置工具类型 + 类型操作符
 *
 * 运行：npm run 06
 *
 * 这些是 TS 内置的"类型转换工具"，实际项目中天天用。
 * Java 没有直接对应（Java 通常靠新建类/继承实现），
 * TS 可以在【类型层面】直接操作，不需要改任何运行时代码。
 */

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// ===== 1. Partial<T>：所有属性变可选（适合"更新"场景）=====
// Java 里要做"部分更新"，得建一个 UpdateUserDTO 类，TS 直接类型层搞定
type UpdateUser = Partial<User>;
const update: UpdateUser = { name: "新名字" }; // 只改名字也合法
console.log("Partial 更新:", update);

// ===== 2. Required<T>：所有属性变必填（与 Partial 相反）=====
type StrictUser = Required<Partial<User>>; // 组合使用
// ===== 3. Readonly<T>：所有属性只读 =====
type ImmutableUser = Readonly<User>;
// 类似 Java 的不可变类/记录

// ===== 4. Pick<T, K>：挑选部分属性 =====
// Java 对应：DTO 只暴露部分字段
type UserPublicInfo = Pick<User, "id" | "name">;
const publicInfo: UserPublicInfo = { id: 1, name: "Alice" };
console.log("Pick 挑选:", publicInfo);

// ===== 5. Omit<T, K>：排除部分属性 =====
// 常用于"创建时不带 id / createdAt"
type CreateUserInput = Omit<User, "id" | "createdAt">;
const newUserInput: CreateUserInput = { name: "Bob", email: "bob@x.com" };
console.log("Omit 排除:", newUserInput);

// ===== 6. Record<K, V>：构造对象类型（键值映射）=====
// Java 对应：Map<Enum, V> 但类型更严格
type HttpStatusName = "ok" | "notFound" | "serverError";
const statusMessages: Record<HttpStatusName, string> = {
  ok: "200 成功",
  notFound: "404 未找到",
  serverError: "500 服务器错误",
};
console.log("Record:", statusMessages.ok);
// statusMessages.badRequest = "...";  // ❌ 不在键类型里

// ===== 7. ReturnType<T>：取函数返回类型 =====
function createUser(name: string): User {
  return { id: 1, name, email: "", createdAt: new Date() };
}
type CreatedUser = ReturnType<typeof createUser>;
const cu: CreatedUser = { id: 2, name: "C", email: "c@x.com", createdAt: new Date() };
console.log("ReturnType:", cu.name);

// ===== 8. 索引访问类型 T[K] =====
type UserNameType = User["name"]; // string
type UserIdAndName = User["id" | "name"]; // string | number
console.log("索引访问:", typeof null === "object" ? "索引类型已推导" : "");

// ===== 9. typeof（在类型上下文里取变量的类型）=====
const config = { host: "localhost", port: 8080 };
type Config = typeof config; // { host: string; port: number }
console.log("typeof 取类型:", "config.host =", config.host);

// ===== 10. 实际综合小例子：写一个类型安全的"状态机" =====
// 用判别式联合 + 工具类型，实现一个简单的 loading 状态
interface IdleState {
  status: "idle";
}
interface LoadingState {
  status: "loading";
}
interface SuccessState<T> {
  status: "success";
  data: T;
}
interface ErrorState {
  status: "error";
  message: string;
}

// 判别式联合
type AsyncState<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;

function describe<T>(state: AsyncState<T>): string {
  switch (state.status) {
    case "idle":
      return "未开始";
    case "loading":
      return "加载中...";
    case "success":
      return `加载成功，数据: ${JSON.stringify(state.data)}`;
    case "error":
      return `出错: ${state.message}`;
  }
}

console.log(describe<number>({ status: "idle" }));
console.log(describe<number>({ status: "loading" }));
console.log(describe<number>({ status: "success", data: 42 }));
console.log(describe<number>({ status: "error", message: "网络超时" }));

export {};
