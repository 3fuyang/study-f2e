// 实现内置对象Promise
class fakePromise{
  // 构造函数
  constructor(executor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    // A+规范规定then可以被一个Promise对象多次调用，则用一个数组来存放回调，然后改变状态时再去遍历执行回调
    this.callbacks = []
    const resolve = (val) => {
      if(this.status !== 'pending') return
      this.status = 'fulfilled'
      this.value = val
      this.callbacks.forEach((callback) => callback.onResolved())
    }
    const reject = (err) => {
      if(this.status !== 'pending') return
      this.status = 'rejected'
      this.reason = err
      this.callbacks.forEach((callback) => callback.onRejected())
    }
    try {
      executor(resolve, reject)
    }catch(err) {
      reject(err)
    }
  }

  // thenable
  then(onResolved = null, onRejected = null) {
    // A+规范中，onResolved和onRejected都必须是函数对象，且可选
    // 对于空白handler或非函数对象，进行polyfill，实现then的穿透
    if(typeof onResolved !== 'function') onResolved = value => value
    if(typeof onRejected !== 'function') onRejected = reason => {throw reason}

    // then方法返回一个Promise对象，并且该返回期约的resolve或reject方法应该在当前期约中被调用，
    // 并且将当前 promise 的 value 或 reason 作为参数传入,以支持连缀操作
    const promise = new Promise((resolve, reject) => {
      // 使用setTimeout将处理程序推入微任务队列，保证在目标Promise的executor(主任务)执行完毕后执行
      if(this.status === 'fulfilled'){
        setTimeout(() => {
          // 异常处理
          try{
            // 将对返回期约的处理封装到resolvePromise方法中
            this.resolvePromise(promise, onResolved(this.value), resolve, reject)
          }catch(err){
            reject(err)
          }
        })
      }else if(this.status === 'rejected'){
        setTimeout(() => {
          try{
            this.resolvePromise(promise, onRejected(this.reason), resolve, reject)
          }catch(err){
            reject(err)
          }
        })
      }else if(this.status === 'pending'){
        // 预先存放回调，在调用resolve或reject时再手动执行
        this.callbacks.push({
          // 注意：此处以及上面正常执行时，调用的都是返回期约的resolve方法，这保证了期约之间的状态不相互影响
          onResolved: () => setTimeout(() => {
            try{
              this.resolvePromise(promise, onResolved(this.value), resolve, reject)
            }catch(err){
              reject(err)
            }
          }),
          onRejected: () => setTimeout(() => {
            try{
              this.resolvePromise(promise, onRejected(this.reason), resolve, reject)
            }catch(err){
              reject(err)
            }            
          })
        })
      }
    })
    return promise
  }

  // 处理then方法的返回期约
  resolvePromise(promise, result, resolve, reject) {
    // 判断循环引用：在原生 Promise 中，一个返回的 promise 的 onResolved 返回了自身
    if(promise === result) reject(new TypeError('Chaining cycle detected for promise'))
    // 处理返回Promise对象和嵌套的Promise对象的情况
  }

  // 静态方法
  static resolve(value = null){
    const promise =  new Promise((resolve, reject) => {
      setTimeout(() => {
        resolvePromise(promise, value, resolve, reject)
      });
    })
  }

  static reject(reason = null){
    return new Promise((resolve, reject) => {
      reject(reason)
    })    
  }
}

new fakePromise((resolve, reject) => {
  resolve()
}).then(() => console.log(1))
console.log(2)