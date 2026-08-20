/**
 * 阶段一：02 —— 数组、对象、函数、联合类型
 *
 * 运行：npm run 02
 */

// ===== 数组（对比 Java 数组/List）=====
// 两种写法等价
let nums: number[] = [1, 2, 3];
let nums2: Array<number> = [1, 2, 3]; // 泛型写法，和 Java 的 List<Number> 类似

// 元组 Tuple：固定长度、每个位置类型固定（Java 没有直接对应）
let pair: [string, number] = ["年龄", 25];
console.log("元组：", pair[0], pair[1]);
// pair = [25, "年龄"];  // ❌ 报错，位置类型不符

// ===== 对象（对比 Java 的 class/POJO）=====
// 直接字面量定义对象，TS 会自动推断结构
const user = {
  name: "小明",
  age: 25,
};
console.log("对象：", user.name);

// 但注意：用 const 声明对象，属性仍可改，只是引用不能变
// user = {...};  // ❌ 报错

// ===== 函数（对比 Java 方法）=====
// 参数要标注类型，返回值可标注（不标也能推断）
function add(a: number, b: number): number {
  return a + b;
}
console.log("函数 add(3,5) =", add(3, 5));

// 可选参数：加 ? 表示可不传（Java 里通常用重载实现）
function greet(name: string, greeting?: string): string {
  // greeting 可能是 undefined，需要处理
  return `${greeting ?? "你好"}，${name}`;
}
console.log(greet("小明"));
console.log(greet("小红", "早上好"));

// ===== 联合类型（这是 TS 的核心特性，Java 用接口/继承实现）=====
// 一个变量可以是 string 或 number
let id: string | number;
id = "abc123";
id = 42;
console.log("联合类型 id =", id);

// 字面量类型：限定只能是这几个值（类似 Java 枚举）
type Direction = "up" | "down" | "left" | "right";
let dir: Direction = "up";
// dir = "backward";  // ❌ 报错，不在联合里
console.log("字面量方向：", dir);

// any：绕过类型检查（尽量避免！）
let anything: any = "可以是任何东西";
anything = 123;
anything = { whatever: true };
console.log("any 类型：", anything);

// ===== 类型别名 type（Java 里没有直接对应，类似 typedef）=====
// 给一个类型起名字，方便复用
type Point = { x: number; y: number };
const p: Point = { x: 10, y: 20 };
console.log("Point 坐标：", p.x, p.y);
