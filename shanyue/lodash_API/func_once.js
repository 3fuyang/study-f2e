// _.once(func)
// 创建一个只能调用 func 一次的函数。 重复调用返回第一次调用的结果。 
// func 调用时， this 绑定到创建的函数，并传入对应参数。

// 第一版，遗落了返回值为undefined或null的情形
function once(fn) {
  let result
  return (...args) => {
    if(result) return result
    return result = fn(...args)
  }
}

// 第二版，用一个专门的变量invoked来记录函数是否被调用过
function once_(fn) {
  let result
  let invoked = false
  return (...args) => {
    if(invoked) return result
    invoked = true
    return result = fn(...args)
  }
}

// test
const f = x => x

const onceF = once(f)

//=> 3
console.log(onceF(3))

//=> 3
console.log(onceF(4))