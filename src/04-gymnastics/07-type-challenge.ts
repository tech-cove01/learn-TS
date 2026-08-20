/**
 * 阶段四：07 —— 类型体操入门：条件类型 / infer / 映射类型
 *
 * 这个文件主要是【类型层面的逻辑】，运行时输出很少。
 * 用类型断言 + 故意写错的变量来"验证"类型是否如预期。
 *
 * 运行：npm run build 编译通过即可（类型对了就不会报错）
 */

// ===== 1. 条件类型：T extends U ? X : Y =====
// 有点像 Java 的泛型通配符 + 三元运算，但发生在类型层面
type IsString<T> = T extends string ? "是字符串" : "不是字符串";
type Result1 = IsString<string>; // "是字符串"
type Result2 = IsString<number>; // "不是字符串"

// 验证方式：把正确类型赋给变量，编译通过就说明类型对了
const r1: Result1 = "是字符串";
const r2: Result2 = "不是字符串";
console.log("条件类型:", r1, r2);

// ===== 2. infer：从已有类型中"抽取"类型 =====
// infer 有点像"模式匹配"，把结构中的某部分取出来
type ElementOf<T> = T extends Array<infer E> ? E : never;

type Arr = ElementOf<string[]>; // string
type NumArr = ElementOf<number[]>; // number

const e1: Arr = "元素";
const e2: NumArr = 42;
console.log("infer 抽取:", e1, e2);

// 经典例子：取出函数的返回类型（手写 ReturnType）
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;

function getUser() {
  return { name: "Alice", age: 30 };
}
type UserType = MyReturnType<typeof getUser>; // { name: string; age: number }
const parsedUser: UserType = { name: "Alice", age: 30 };
console.log("手写 ReturnType:", parsedUser.name);

// ===== 3. 映射类型：遍历对象的所有键并转换 =====
// 手写 Partial<T>：把所有属性变成可选
type MyPartial<T> = {
  // [K in keyof T] 遍历所有键，? 表示可选
  [K in keyof T]?: T[K];
};

interface Task {
  title: string;
  done: boolean;
}
const partialTask: MyPartial<Task> = { title: "只改标题" }; // done 可选
console.log("手写 Partial:", partialTask);

// 手写 Readonly<T>
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// ===== 4. 进阶：条件 + 映射组合 —— 提取函数的参数类型 =====
type MyParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

function orderFood(item: string, qty: number): void {}
type OrderParams = MyParameters<typeof orderFood>; // [string, number]
const params: OrderParams = ["汉堡", 2];
console.log("手写 Parameters:", params);

// ===== 5. 分布式条件类型（联合类型会自动分发）=====
type ToArray<T> = T extends any ? T[] : never;
type ArrUnion = ToArray<string | number>; // string[] | number[]（分发）
// 对比非分发版
type ToArrayNonDistributive<T> = [T] extends [any] ? T[] : never;
type ArrUnion2 = ToArrayNonDistributive<string | number>; // (string | number)[]

console.log("分布式条件类型：类型在编译期展开，此处仅验证编译通过");

// ===== 6. 综合：一个泛型工具库常用的 "UnionToIntersection" =====
// 高级玩法，理解即可，不用深究
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer I) => void
  ? I
  : never;

export {};
