// 实现一个无限累加的 sum 函数
// 函数式编程：柯里化 + 惰性函数链
function sum(...args) {
  // 递归返回sum
  const f = (...rest) => sum(...args, ...rest)
  // 附加valueOf方法
  f.valueOf = () => {
    return args.reduce((prev, curr) => prev + curr)
  }
  // 返回一个对象
  return f
}

//test
console.log(sum(1, 2, 3).valueOf()) //6
console.log(sum(2, 3)(2).valueOf()) //7
console.log(sum(1)(2)(3)(4).valueOf()) //10
console.log(sum(2)(4, 1)(2).valueOf()) //9
console.log(sum(1)(2)(3)(4)(5)(6).valueOf()) // 21