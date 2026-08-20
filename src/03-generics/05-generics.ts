/**
 * 阶段三：05 —— 泛型（对比 Java 泛型）
 *
 * 运行：npm run 05
 *
 * 你有 Java 泛型基础，这里重点看 TS 泛型的灵活之处。
 */

// ===== 1. 泛型函数 =====
// Java: public <T> T identity(T value)
function identity<T>(value: T): T {
  return value;
}
const a = identity("hello"); // T 推断为 string
const b = identity(42); // T 推断为 number
console.log("泛型 identity:", a, b);

// ===== 2. 泛型约束 extends（Java 的 bounded type <T extends Comparable<T>>）=====
// 约束 T 必须有 length 属性
function logLength<T extends { length: number }>(item: T): void {
  console.log(`${item.length} 个元素`);
}
logLength("abc"); // 字符串有 length
logLength([1, 2, 3]); // 数组有 length
// logLength(123);  // ❌ number 没有 length，报错

// ===== 3. 泛型接口 =====
// Java: interface Box<T>
interface Box<T> {
  content: T;
}
const stringBox: Box<string> = { content: "一个字符串" };
const numberBox: Box<number> = { content: 99 };
console.log("泛型接口:", stringBox.content, numberBox.content);

// ===== 4. 泛型与默认类型（Java 没有，Java 要 Optional 或重载）=====
function createArray<T = string>(length: number): T[] {
  return new Array(length);
}
const defaultArr = createArray(3); // 没传，T 默认 string
console.log("默认泛型:", defaultArr);

// ===== 5. 多泛型参数（Java 也支持 <K, V>）=====
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
const entry = pair("name", "小明");
console.log("多泛型:", entry);

// ===== 6. 泛型 + 联合类型 + keyof：写一个安全的取值函数 =====
// keyof 取对象所有键的类型
// Java 对应：反射 + 泛型，但 TS 更类型安全
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const person = { name: "Alice", age: 30, city: "北京" };
const name2 = getProperty(person, "name"); // string
const age2 = getProperty(person, "age"); // number
console.log("keyof 泛型:", name2, age2);
// getProperty(person, "email");  // ❌ person 没有 email 键，编译报错

// ===== 7. 泛型在函数类型/回调里的应用（很像 Java 的 Function<T,R>）=====
type Mapper<T, U> = (value: T) => U;
const double: Mapper<number, number> = (n) => n * 2;
const toStr: Mapper<number, string> = (n) => `数字${n}`;
console.log("函数类型泛型:", double(4), toStr(4));

export {};
