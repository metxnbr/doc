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

## useEffect

一个很强大的接口, 可以用它做很多东西, 毕竟它是可以替代`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`, 并且把它结合起来使用的.

> Mutations, subscriptions, timers, logging, and other side effects

上面这句引用表明`useEffect`里面可以运行处理`state`修改, 订阅事件, 定时器, 日志输出等其它副作用

```jsx
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});
```

有订阅就有取消订阅, `useEffect`中可以选择性的返回一个函数, 这函数会在ui离开(`unmount`)前运行,可以把它称为`cleaned up`, 当然, 实际中组件会有多次render, **previous effect is cleaned up before executing the next effect**, 这句话在api文档中是被加粗了的, 意思是组件render多次, 前一次effect的`cleaned up`会在下次effect前运行. **只关注`api`的新也不行, 就像讨论react, vue, angular哪家强一样, 解决问题才是重点**,
下面结合实际项目开发中的项目说说  

场景: 页面提供`id`后, 会根据server端数据渲染, 这个异步过程中, `mount`阶段页面会`loading`到渲染完成, 接着前端`id`可能改变, 需要`update`, 这时`useEffect`中的`cleaned up`会清除上次的订阅, 重新`loading`, 而不是停留在上次的数据, 清除完会重新更新页面数据. 期间页面的离开(`unmount`), `cleaned up`依然会运行, 防止了内存泄漏.

```jsx
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

可以传递一个数组参数, 表明执行effect的条件,上面例子是只有`props.source`有改变,才会创建新的订阅.

这让我想到以前的`class`组件代码:

```jsx
componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

新的`hooks`接口, 无需`if`语句, 在处理这上面更直观明确.

waitting...