const regs = []
regs.push(/[1,2,3]/g)
regs.push(/[1-3]/g)
regs.push(/[^0-9]/g)
regs.push(/\d{2,5}/g)
regs.push(/good|nice|great/g)

/* 字符匹配 */

// 匹配16进制颜色
const color = /#[0-9a-fA-F]{3}|#[0-9a-fA-F]{6}/g
console.log(color.test(`#eee`))

// 时间（hh:mm）
const hhmm = /^(0?[0-9]|[1][0-9]|2[0-3]):[0-5][0-9]$/g
console.log(hhmm.test(`6:59`))

// 日期（yyyy-mm-dd）
const date = /^\d{4}-(0[1-9]|1[0-2])-([012]\d|3[01])$/g
console.log(date.test(`1929-12-31`))

// windows操作系统文件路径
const winFile = /[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?/g

// 匹配id="container"
const id = /id="[^]+"/g
console.log(id.test('id="container"'))

/* 位置匹配 */

// 不匹配任何东西
const nothing = /.^/g

// 数字的千分位分隔符表示法，12,345,678
const thousands = /(?!^)(?=(\d{3})+$)/g
let str = '123456789'.replace(thousands, ',')
console.log(str)

// 验证密码：密码长度6-12位，由数字、小写字母和大写字母组成，但必须至少包括以上2种字符
const passwordValidation = /((?=.*\d)(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9a-zA-Z]{6,12}$/g
const pwdValidation = /(?!^[0-9]{6,12})(?!^[a-z]{6,12})(?!^[A-Z]{6,12})^[0-9a-zA-Z]{6,12}$/g
console.log(passwordValidation.test(`Qwe45678`))

/* 括号的作用 */

// 分组引用
let yyyy_mm_dd = /^\d{4}-(1[012]|0[1-9])-(0[1-9]|[12]\d|3[01])$/g
console.dir(yyyy_mm_dd.exec(`2020-03-20`))

// 反向引用
let yyyy_mm_dd2 = /^\d{4}([-\/\.])(1[012]|0[1-9])[-\/\.](0[1-9]|[12]\d|3[01])$/g
let yyyy_mm_dd3 = /^\d{4}([-\/\.])(1[012]|0[1-9])\1(0[1-9]|[12]\d|3[01])$/g

// 模拟字符串trim方法
let trimPattern1 = /^\s+|\s+$/g
let trimPattern2 = /^\s*(.*?)\s*$/g
let str1 = `   Have a look!    `
let result = str1.replace(trimPattern1, '')
let result_ = str1.replace(trimPattern2, '$1')
console.log(result)
console.log(result_)

// 将每个单词的首字母转换成大写
let capitalizePattern = /(?:^|\s)\w/g
let littleStr = `let me think if it works`
let capitalizedStr = littleStr.replace(capitalizePattern, (c) => {
  return c.toUpperCase()
})
console.log(capitalizedStr)

// kebab-case命名驼峰化：moz_trans-o => MozTransformO
let camelCase = /[-_\s]+(.)?/g
let kebab = `_my-component`
let camel = kebab.replace(camelCase, (match, c) => {
  return c === '_' || c === '-' || new RegExp('\s').test(c) ?''():c.toUpperCase()
})
console.log(camel)

// 匹配成对标签
let tag = /<([^>]+)>.*?<\/\1>/
let htmlLine = `<p>Test this RegExp</p>`
console.log(tag.test(htmlLine))

/* 正则表达式的拆分 */

/* 正则表达式的构建 */

// 匹配固定电话
// 055188888888
// 0551-88888888
// (0551)888888
const telReg = /^(\d{4}-?|\(\d{4}\))\d{8}$/g
console.log(telReg.test(`0551-88888888`))

// 匹配浮点数
// 1.23 +1.23 -1.23 .2 +.2 -.2
const float = /^[+-]?\d?(?:\.\d+)?$/g
let double = '+.23'
console.log(float.test(double))