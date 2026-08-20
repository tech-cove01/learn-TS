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
