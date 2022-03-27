// 实现一个 promise.map，进行并发数控制
Promise.prototype.map = (input, mapper, options = { concurrency: Infinity }) => {
  // 将Iterable转化为数组
  const array = Array.from(input)
  return new Promise((resolve, reject) => {
    let currentIndex = 0
    let resolveCount = 0
    const results = []
    const len = array.length
    function next() {
      const index = currentIndex
      ++currentIndex
      Promise.resolve(array[index]).then((inputItem) => {
        // mapper()生成Promise或原始值
        return mapper(inputItem, index)
      }).then((res) => {
        results[index] = res
        resolveCount++
        if(resolveCount === len){
          resolve(results)
        }
        if(currentIndex < len){
          // 当一个Promise实例解决后，再创建一个新的Promise
          next()
        }
      }).catch(e => reject(e))
    }
    for(let i = 0; i < options.concurrency && i < len; ++i){
      // 初始化最大并发数个Promise实例
      next()
    }
  })
}
// test
Promise.prototype.map([1, 2, 3, 4, 5], x => Promise.resolve(x + 1)).then((value) => { console.log(value) })

Promise.prototype.map([Promise.resolve(1), Promise.resolve(2)], x => x + 1).then((value) => { console.log(value) })

// 注意输出时间控制
const sleep = (delay) => {
  // 初始化Promise对象传入的executor是立即同步执行的，
  // 但是由于计时器的特性，这里的sleep是异步的，系统会跳转执行同步流中的代码
  return new Promise((resolve) => {
    // 注意：这里传入函数名（指针）resolve，而不是resolve()执行函数，这是setTimeout和setInterval的函数签名规定的
    setTimeout(resolve, delay)
  })
}
Promise.prototype.map([1, 1, 1, 1, 1, 1, 1, 1], x => sleep(1000), { concurrency: 2 }).then((value) => { console.log(value) })