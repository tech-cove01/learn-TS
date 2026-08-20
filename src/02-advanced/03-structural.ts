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

export {};
