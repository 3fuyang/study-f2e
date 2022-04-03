// Promise.prototype.all()：接收一个包含期约的可迭代对象（其中没有thenable接口的元素通过Promise.resolve()转换为期约），
// 返回一个Promise实例，该返回期约会在所有参数期约落定后落定。
// Promise.resolve()如果传入一个期约，那它的行为就是一个空包装，即其为一个幂等方法。
Promise.prototype.fakeAll = function(args){
  // Array.prototype.from()将类数组对象转换为真正的数组
  const promises = Array.from(args)
  let count = 0
  const len = promises.length
  const results = []
  return new Promise((resolve, reject) => {
    for(let i = 0; i < len; ++i){
      Promise.resolve(promises[i]).then(
        (res) => {
          results[i] = res
          if(++count === len){
            resolve(results)
          }
        },
        (e) => {
          reject(e)
        }
      )
    }
  })
}

// test
const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds))

Promise.prototype.fakeAll([1, 2, 3]).then(o => console.log(o))
Promise.prototype.fakeAll([1, Promise.resolve(3)]).then(o => console.log(o))
Promise.prototype.fakeAll([1, Promise.reject(3)]).then(o => console.log('done')).catch(e => console.log(e))
Promise.all([1, Promise.reject(3)]).then(o => console.log('done')).catch(e => console.log(e))

Promise.prototype.fakeAll([sleep(1000), sleep(1000), sleep(1000), sleep(1000), sleep(1000)]).then(o => console.log('Sleep Done'))