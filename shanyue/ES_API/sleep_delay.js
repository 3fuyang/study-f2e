// sleep
const sleep = (delay) => {
  // 初始化Promise对象传入的executor是立即同步执行的，
  // 但是由于计时器的特性，这里的sleep是异步的，系统会跳转执行同步流中的代码
  new Promise((resolve) => {
    // 注意：这里传入函数名（指针）resolve，而不是resolve()执行函数，这是setTimeout和setInterval的函数签名规定的
    setTimeout(resolve, delay)
  })
}
/* const sleep = (seconds) => new Promise(resolve => setTimeout(resolve, seconds)) */

// test for sleep
// 怀疑这里的sleep原意就是要实现两个耦合的异步操作之间的休眠
/* console.log(`开始休眠于${new Date()}`)
sleep(2000)
console.log(`结束休眠于${new Date()}`) */

// delay
// 实现一个 delay 函数格式如下，在 N 毫秒之后执行函数，并以函数结果作为返回值
// function delay (func, ms, ...args) { //... }
// await delay((str) => str, 3000, 'hello, world')
// await delay((str) => Promise.resolve(str), 3000, 'hello, world')
/* function delay(func, ms, ...args) {
  return new Promise((resolve) => {
    setTimeout(resolve(func(...args)), ms)
  })
} */
function delay (func, seconds, ...args) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 使用Promise.resolve()静态方法，实例化一个新的fulfilled Promise对象
      // 箭头函数，在块中必须显式使用return返回值；而单行表达式会隐式返回
      // then中注册的resolve会解决外层Promise对象，并且内部的Promise的func()结果会随着其resolve()传递给onResolved，也就是外部期约的resolve，
      // 这样外部期约解决时便返回了传入函数的执行结果
      Promise.resolve(func(...args)).then(resolve)
    }, seconds)
  })
}

// 测试delay
console.log(new Date())
delay((str) => {
  console.log(new Date())
  return str
}, 3000, 'shanyue').then(o => console.log(o))