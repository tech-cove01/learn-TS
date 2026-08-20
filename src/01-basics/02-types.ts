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

// ============================================================
// 以下为【常见问题补充示例】，用 npm run 02 就能看到输出
// ============================================================

// ---------- 问题1：console.log 之外还有哪些输出方式 ----------
console.log("这是 log（最常用）");
console.warn("这是 warn（黄色警告）");
console.error("这是 error（红色错误，适合出错时用）");
console.info("这是 info（信息日志）");
// console.table 适合打印数组/对象（结构化的表格形式）
console.table([{ 姓名: "小明", 年龄: 18 }, { 姓名: "小红", 年龄: 20 }]);

// ---------- 问题2：? （可选参数） 和 ?? （空值合并）的区别 ----------
// ? 写在"参数名后"：表示这个参数可以不传
// ?? 写在"取值时"：左边是 null/undefined 就用右边的默认值（类似 Java 的 Optional.orElse）
function greet2(name: string, greeting?: string): string {
  return `${greeting ?? "你好"}，${name}`; // ?? 处理"没传"的情况
}
console.log("? 和 ?? 的例子：", greet2("小明"));        // greeting 没传 -> 用"你好"
console.log("? 和 ?? 的例子：", greet2("小红", "早上好")); // 传了 -> 用传的值

// ---------- 问题3：多个参数 + 默认值参数（最推荐的写法）----------
// 默认值参数：直接给 "= 默认值"，比 ?? 更简洁
function order(food: string, qty: number = 1, note: string = "无备注"): string {
  return `${food} x${qty}（${note}）`;
}
console.log("多参数默认值：", order("汉堡"));           // 只传必选 food
console.log("多参数默认值：", order("汉堡", 3));         // 省略了 note
console.log("多参数默认值：", order("汉堡", 3, "不要辣")); // 全传

// 注意：默认参数/可选参数都要放在必选参数【后面】
// function bad(a?: number, b: number) {}   // ❌ 报错

// ---------- 问题4：$ 和 模板字符串 ----------
// `${变量}` 是模板字符串的插值语法，作用 = Java 的字符串拼接 +
const tplName = "小明";
const tplAge = 18;
// 旧写法：用 + 拼接（像 Java）
const oldStyle = "你好，" + tplName + "，今年" + tplAge + "岁";
// 新写法：用反引号 `` 包裹，${} 里放变量（推荐）
const newStyle = `你好，${tplName}，今年${tplAge}岁`;
console.log("模板字符串 旧写法：", oldStyle);
console.log("模板字符串 新写法：", newStyle);

// 模板字符串还能直接换行
const multiLine = `第一行
第二行 ${tplAge}
第三行`;
console.log("模板字符串 多行：");
console.log(multiLine);
