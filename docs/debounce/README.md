# debounce & throttle

防抖和节流, 两者都是优化高频率执行的方法.

- [DEMO](./debounce/)

## debounce

```js
function debounce(func, wait) {
    let timeout;
    return function(...argus) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout( () => func.apply(context, argus), wait );
    }
}
```

运用的实际场景: 实时搜索, 用户输入值, 节约请求资源.

## React Hook, useDebounce 🆕

来自: https://github.com/xnimorz/use-debounce

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}
```

## throttle

```js
const throttle = (func, limit) => {
    let inThrottle;
    return function(...argus){
        const context = this
        if(!inThrottle) {
            func.apply(context, argus);
            inThrottle = true;
            setTimeout( () => inThrottle = false, limit)
        }
    }
}
```

### Note

代码片段中使用了`apply`, 我们想要把`this`绑定到调用函数时的上下文, 而不是全局, 否则以下这种情况会与预期不一致.

```js
function sayHello() {
    console.log('My name is', this.name)
}
const anna = {
    name: 'Anna',
    say: debounce(sayHello),
}

anna.say() // My name is undefined

```

> The rest parameter syntax allows us to represent an indefinite number of arguments as an array

剩余参数语法允许我们将一个不定数量的参数表示为一个数组

```js
function(...argus) {}
```

考虑到兼容, 可以转换为

```js
function() {
    var argus = arguments;
}
```