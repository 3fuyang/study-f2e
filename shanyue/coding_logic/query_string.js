// 实现一个函数用来对 URL 的 querystring 进行编码
// 只做一些基本的功能，满足以下条件
// 对 null/undefined/object 编码为空字符
// 对 key/value 记得 encodeURIComponent
// 不考虑数组及嵌套对象等复杂操作
function stringify(obj) {
  let result = ''
  for(let prop in obj){
    result += `${encodeURIComponent(prop)}=${obj[prop]?encodeURIComponent(obj[prop]):''}&`
  }
  return result.substring(0, result.length - 1)
}

// test
// a=3&b=4
console.log(stringify({ a: 3, b: 4 }))

// a=3&b=
console.log(stringify({ a: 3, b: null }))

// a=3&%E5%B1%B1=%E6%9C%88
console.log(stringify({ a: 3, '山': '月' }))