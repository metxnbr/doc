# JSONP

> JSONP is a method for sending JSON data without worrying about cross-domain issues.
JSONP does not use the XMLHttpRequestobject.
JSONP uses the `<script>` tag instead.

## Note

JSONP是发送json数据的方法, 使用它不用担心跨越的问题

JSONP不需要使用`xhr`对象, 而是使用`<script>`标签替代

请求其他域名下的文件会因为跨域的策略引起一些问题, 而请求其他域名下的外部`script`, 是没有跨域这个问题的.

写了一个`demo`:

- `cd docs/jsonp/src`, `yarn`安装
- 打开一个终端窗口运行 `node server1`
- 打开**另一个**终端窗口运行`node server2`
- 访问[http://localhost:3001/](http://localhost:3001/)

demo仅安装了`express`服务, 刚好它提供了一个接口:`res.jsonp({...})`

当浏览器插入`<script src="api?callback=fn"></script>`时, 相当于运行了以下js, 只要定义一个fn的方法就可以接受json数据

```js
typeof fn === 'function' &&
fn({"text":"you can see me use jsonp"});
```