/**
 * 阶段五：08 —— Vue 3 + TypeScript 核心用法
 *
 * 说明：Vue3 组件用 .vue 文件，但 TS 类型逻辑可以独立学习。
 * 这里用纯 TS 演示 Vue3 Composition API 的类型安全写法。
 *
 * 运行：npm run 08（编译运行验证类型逻辑）
 */

// ===== 1. defineProps 的类型安全 =====
// Vue3 里组件接收 props，用泛型保证类型
// 真实 .vue 里这样写：
// const props = defineProps<{
//   title: string
//   count?: number
// }>()

// 这里用纯 TS 模拟同样的类型约束
interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "danger"; // 字面量联合，类似枚举
  disabled?: boolean;
  onClick?: () => void; // 函数类型 prop（Java 的函数式接口）
}

// 模拟组件内部
function useButton(props: ButtonProps) {
  // 可选属性需要给默认值
  const variant = props.variant ?? "primary";
  const disabled = props.disabled ?? false;
  return { variant, disabled, label: props.label };
}

const btn = useButton({ label: "保存", variant: "primary" });
console.log("Vue prop 类型:", btn.variant, "disabled =", btn.disabled);

// ===== 2. ref / computed 的类型推断 =====
// Vue3 里 const count = ref(0) 会自动推断 Ref<number>
// 这里模拟 ref 的类型
interface Ref<T> {
  value: T;
}
function ref<T>(value: T): Ref<T> {
  return { value };
}

const count = ref(0); // Ref<number>
count.value++;
console.log("Vue ref:", count.value);

// computed 返回派生值
function computed<T>(getter: () => T): Ref<T> {
  return { value: getter() };
}
const doubled = computed(() => count.value * 2);
console.log("Vue computed:", doubled.value);

// ===== 3. reactive 深层响应式 =====
// 泛型约束对象
function reactive<T extends object>(obj: T): T {
  return obj;
}
const state = reactive({ user: { name: "小明", age: 25 }, loading: false });
console.log("Vue reactive:", state.user.name, state.loading);

// ===== 4. emit 事件类型（类似 Java 的事件监听器）=====
interface Emits {
  "update:modelValue": (value: string) => void;
  submit: (payload: { id: number; text: string }) => void;
}
function useEmits(emits: Emits) {
  return {
    change: (v: string) => emits["update:modelValue"](v),
    doSubmit: (payload: { id: number; text: string }) => emits.submit(payload),
  };
}
const fakeEmits: Emits = {
  "update:modelValue": (v) => console.log("emit update:", v),
  submit: (p) => console.log("emit submit:", p.id, p.text),
};
const emits = useEmits(fakeEmits);
emits.change("新值");
emits.doSubmit({ id: 7, text: "提交内容" });

// ===== 5. 模板中 v-model / 事件绑定 在 TS 层面对应 =====
// 核心：所有 props/emits 都有类型，配合 IDE 提示，写错立即标红
console.log("Vue3 + TS 核心：props 有类型、ref 自动推断、emit 有签名");

export {};
