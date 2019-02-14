# react-hooks-doc

`react v16.8.0` 稳定版本正式发布了, 在`16.7-apha`时就有关注, 那时就很喜欢这个新功能, 测试版时我在学习`vue`, 没有具体研究它, 现在正式版发布了, 意味着可以投放生产了, 很认真的关注了下`Hooks`, 啃了几遍新功能的`api`文档.  
有以下几点让我觉得深入学习`Hooks`很有必要:

- `Hooks`作为一个新写法,除了这两个并不常用的`getSnapshotBeforeUpdate`, `componentDidCatch`生命周期,其余完全可以用`Hooks`替代之前的`classes`写法(官方也表示后续会添加替代), 摘自文档:

> Our goal is for Hooks to cover all use cases for classes as soon as possible. There are no Hook equivalents to the uncommon getSnapshotBeforeUpdate and componentDidCatch lifecycles yet, but we plan to add them soon.

- 个人感觉新的写法更简洁

## useState

这个接口比较简单,需要注意的是, 官方文档有`Note`:
> Unlike the setState method found in class components, useState does not automatically merge update objects. You can replicate this behavior by combining the function updater form with object spread syntax

和`setState`不一样, `useState`不会自动合并更新的对象, 如下:

```jsx
function ExampleWithOneState() {
  const [obj, setObj] = useState({
    age: 22,
    fruit: 'banana,
    todos: [{ text: 'Learn Hooks' }],
  });

  setObj({age: 25}) // ⛔ 更新age时, 并不像 setState 自动合并其他

  setObj(prevState=>({
    ...prevState,
    age: 25,
  })) // ✅ Object.assign would also work
}
```

读完文档后, 感觉`useState`更推荐下面这种方法管理`state`

```jsx
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

  setFruit('orange');
```

>Tip: Using Multiple State Variables

声明多个`state`, 更简洁, 如果要维护的`state`过大, 可以使用另一个新接口`useReducer`.

waitting...