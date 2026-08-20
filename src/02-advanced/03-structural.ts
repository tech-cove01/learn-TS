/**
 * 阶段二：03 —— interface、type、结构化类型系统
 *
 * 运行：npm run 03
 *
 * 这是你作为 Java 开发者最需要转变思维的一课。
 */

// ===== 1. interface：描述对象形状（对比 Java 的 interface）=====
interface Person {
  name: string;
  age: number;
  // 可选属性：可以没有
  email?: string;
  // 只读属性：不能修改（类似 Java 的 final 字段）
  readonly id: number;
}

const alice: Person = {
  id: 1,
  name: "Alice",
  age: 30,
};
console.log("interface:", alice.name);
// alice.id = 2;  // ❌ 报错，只读
// alice.age = "三十";  // ❌ 报错，类型不符

// ===== 2. 结构化类型系统（鸭子类型）—— 和 Java 最本质的区别 =====
// Java 是【名义化类型】：class Dog 必须显式 implements Animal 才被认为是 Animal
// TS 是【结构化类型】：只要结构匹配就算，不需要显式声明！

interface HasName {
  name: string;
}

// 这个对象没有写 ": HasName"，但结构上有 name 字段
const dog = {
  name: "旺财",
  bark: () => console.log("汪汪"),
};

// 直接把 dog 传给需要 HasName 的函数 —— 合法！因为结构匹配
function printName(o: HasName): void {
  console.log(o.name);
}
printName(dog); // 不需要 implements，也不需要声明，结构对就行

// 想想 Java 里的写法：
// class Dog implements HasName {...}  显式实现
// 而 TS 只需要长得像就行，这就是"鸭子类型"（走起路像鸭子、叫声像鸭子，那它就是鸭子）

// 再多一个字段也没关系 —— 多余的字段可以存在
const cat = {
  name: "咪咪",
  age: 2, // 额外字段
};
printName(cat); // 合法，多余字段不影响

// 反过来不行：缺少必需字段会报错
// printName({ age: 3 });  // ❌ 缺少 name

// ===== 3. type 别名 vs interface =====
// type 更灵活：能做 interface 做不了的事

// interface 只能描述对象，type 可以是任意类型
type StringOrNumber = string | number; // 联合类型只能用 type
type Directions = "north" | "south"; // 字面量联合

// interface 和 type 描述对象时的区别：
// - interface 可以【合并声明】（同名会合并）
// - type 不能同名
interface Car {
  brand: string;
}
interface Car {
  wheels: number;
}
// 两个同名 interface 自动合并了
const myCar: Car = { brand: "Tesla", wheels: 4 };
console.log("interface 合并声明:", myCar.brand, myCar.wheels);

// ===== 4. 类型断言 as（对比 Java 的强制类型转换 (Type)x）=====
// 用得越少越好，但偶尔需要
let someValue: unknown = "hello";
let strLength: number = (someValue as string).length;
console.log("类型断言 strLength =", strLength);

// 更推荐用类型守卫（下一课讲）替代断言

// ============================================================
// 以下为【常见问题补充示例】，用 npm run 03 就能看到输出
// ============================================================

// ---------- 问题：鸭子类型结构相似会不会冲突？大型项目怎么办 ----------
// 答案：不会乱。结构匹配看"属性是否齐全、类型是否对"，且有多种约束手段。

// ① 对象字面量严格检查：直接写对象字面量时，多余字段会报错（防止笔误）
interface StrictPerson {
  name: string;
  age: number;
}
// printPerson({ name: "x", age: 20, secret: "hi" }); // ❌ 对象字面量多余属性报错

function printPerson(p: StrictPerson): string {
  return `${p.name} ${p.age}岁`;
}

// ② 先赋给变量再传：变量形式检查放宽，多余字段不报错
const p2 = { name: "x", age: 20, secret: "hi" };
console.log("变量形式放宽检查:", printPerson(p2)); // ✅ 合法

// ③ 完全不同的结构 -> 直接报错（TS 会拦下）
// printPerson({ name: "x" }); // ❌ 缺 age

// ④ 大型项目靠"类型组织规范"管理，不是裸奔：
//    - 类型集中放到 types/ 目录，export/import 隔离命名空间
//    - 默认用 interface 声明对象形状，集中管理
//    - 开启 strict 模式（本项目的 tsconfig 已开启）
//    - 需要严格区分时，用"判别字段/品牌类型"（类似 agent 的判别式联合）

// ⑤ 品牌类型示例：需要"是 Person 才是 Person，Pet 再像也不行"时的做法
interface BrandUser {
  brand: "user"; // 判别字段：只有 User 才有
  name: string;
  age: number;
}
interface BrandPet {
  brand: "pet"; // 判别字段：只有 Pet 才有
  name: string;
  age: number;
}
function greetBrandUser(u: BrandUser): string {
  return `你好用户 ${u.name}`;
}
console.log(greetBrandUser({ brand: "user", name: "Alice", age: 30 })); // ✅
// greetBrandUser({ name: "Alice", age: 30 }); // ❌ 缺 brand，传不进去
// 即使 Pet 结构再像 User，没有 "user" 这个 brand 也进不来

// ---------- 问题：{} 花括号就代表对象吗？ ----------
// { } 在 TS/JS 里有多种含义，看"出现在哪"：
// ① 对象字面量：{ 键: 值, ... }
const obj1 = { name: "小明", age: 25 }; // 这确实是对象
console.log("对象字面量:", obj1.name, obj1.age);

// ② 类型标注里的 { ... } ：表示"对象形状"（类型），不是值
const point: { x: number; y: number } = { x: 10, y: 20 }; // { x: number } 是类型
console.log("对象形状类型:", point.x, point.y);

// ③ 代码块：函数体/if 语句里的花括号，表示"语句块"，不是对象！
function doSomething(): string {
  // 这里的 { } 是函数体代码块
  const result = "执行了";
  return result;
}
if (point.x > 0) {
  // 这里的 { } 是 if 的语句块
  console.log("if 语句块");
}

// ④ 解构赋值：从对象里"取"字段的写法
const { name: userName2, age: userAge2 } = obj1; // 从 obj1 取出 name、age（重命名避免全局冲突）
console.log("解构赋值:", userName2, userAge2);

// 小结：{} 是不是对象，要看上下文
// - 等号右边、作为值 = 对象字面量
// - 类型位置（冒号后）= 对象形状类型
// - 跟在 function/if/循环后 = 代码块
// - let {a} = obj 里 = 解构
