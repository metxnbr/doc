# Regex Cheat Sheet

## part 1

周杰伦有首歌 `一口气全念对`, 歌词如下, 其实它是一段文字谜, 来解谜下

```js
const lyrics = '就咪让咪压咪力咪喘咪一咪口咪气咪给咪它咪机咪会咪跟咪着咪音咪乐咪将咪爱咪写咪成咪一咪段咪过咪去咪只咪留咪下咪对咪的咪记咪忆'
const regex = /[^咪]/g;
const result = lyrics.match(regex).join('');
console.log(result);
// expected output: '就让压力喘一口气给它机会跟着音乐将爱写成一段过去只留下对的记忆' 😂
```

## part 2

手机号的验证

```js
const a = '13000000001';  // true
const b = '16000000001';  // 第二位不在 34578 中
const c = '1500000001';   // 15 后面 不是 9 位
const d = '2800000001';   // 首位不是 1

const regex = /^1[3|4|5|7|8]\d{9}$/;   // 或者 /^1[34578]\d{9}$/
regex.test(a);
regex.test(b);
regex.test(c);
regex.test(d);

// btw: 个人不建议前端验证太严格
const regexLenient = /^1\d{10}$/;
```

## Part 3

保留小数点后2位数字

```js
const regex = /(\d+\.\d{2})\d*/;
console.log('3.32924321232'.replace(regex, '$1')); // expected output: 3.32
```

waiting...
