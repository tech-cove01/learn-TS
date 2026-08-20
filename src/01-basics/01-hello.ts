/**
 * 阶段一：Hello TypeScript —— 理解编译与运行
 *
 * TypeScript 是 JavaScript 的超集，浏览器/Node 不认识 TS，
 * 必须先编译（tsc）成 JS 才能运行。
 *
 * 运行方式（在项目根目录）：
 *   npm run 01
 *
 * 它等价于：
 *   tsc                      # 把 src 下所有 .ts 编译到 dist/
 *   node dist/01-basics/01-hello.js   # 运行编译产物
 *
 * 你也可以开监听模式自动编译：
 *   npm run watch
 */

// TS 的三个特点：类型注解、类型推断、编译期检查

// 1. 类型注解（type annotation）：显式告诉 TS 这个变量是什么类型
let userName: string = "小明";

// 2. 类型推断（type inference）：TS 自动推断类型，不用手写
let age = 18; // TS 自动推断 age 是 number

// 3. 编译期检查：类型不匹配会在编译时报错（把下面这行取消注释试试）
// age = "二十";  // ❌ 报错：Type 'string' is not assignable to type 'number'

// 基础类型（对比 Java）
let str: string = "hello";
let num: number = 3.14; // TS 只有 number，没有 int/double 之分
let bool: boolean = true;
let big: bigint = 9007199254740993n; // 超大整数，Java 的 long
let sym: symbol = Symbol("id"); // 唯一标识

// null 和 undefined 是独立的类型
let n: null = null;
let u: undefined = undefined;

// void：没有返回值，相当于 Java 的 void 方法
function log(msg: string): void {
  console.log(msg);
}

// 输出
log("你好，" + userName + "，你今年 " + age + " 岁");
log("number 在 TS 中一个类型通吃整数和浮点数：" + num);

// ============================================================
// 以下为【常见问题补充示例】，用 npm run 01 就能看到输出
// ============================================================

// ---------- 问题：let 之外，还有哪些声明变量的方式 ----------
// let   可重新赋值（Java 的普通变量）
// const 不可重新赋值（Java 的 final）
// var   旧式变量（有坑，现代代码不用）

let count = 0; // 要 ++，必须用 let
count++;
log("let 可重新赋值，count = " + count);

const appName = "学习项目"; // 常量，不能改
log("const 常量 appName = " + appName);
// appName = "改名";  // ❌ 报错：const 不能重新赋值

var oldVar = "旧式变量"; // 尽量不用
log("var 是旧式写法（不推荐）：" + oldVar);

// 实际开发习惯：默认用 const，需要重新赋值时才用 let
const fixedUrl = "https://api.example.com"; // 不会变 -> const
let total = 0;                              // 要累加 -> let

// 注意：const 只锁"引用"，对象的内部属性仍可改（和 Java 的 final 引用一致）
const userInfo = { name: "小明", age: 25 };
userInfo.age = 26;       // ✅ 属性可以改
log("const 对象属性仍可改，userInfo.age = " + userInfo.age);
// userInfo = { name: "x" };  // ❌ 报错：userInfo 这个引用不能变
