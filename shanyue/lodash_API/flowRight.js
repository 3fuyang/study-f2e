// _.flowRight(...[function])
// 标准答案：使用reduce实现，注意其中的...args的抽象性
function flowRight(...fns){
  // 使用箭头函数，保证this的一致性
  return fns.reduce((f, g) => (...args) => f(g(...args)))
}

// test
const add5 = x => x + 5
const multiply = (x) => x * 10
const multiply10AndAdd5 = flowRight(
  add5,
  multiply
)
console.log(multiply10AndAdd5(10)) // 105