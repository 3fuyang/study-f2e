// bind

// bind函数接收一个对象改变this指向，接收另外的可选参数作为该函数执行的预置参数，
// 返回一个新的绑定内部this指向的函数
Function.prototype.fakeBind = function(obj, ...rest){
  // 箭头函数不能使用arguments特殊对象，但可以使用rest参数
  // 箭头函数没有prototype属性，所以这里进行一次bind后返回的函数不能再bind其他的对象
  return (...rest_) => {
    // 注意区分内外两个函数的rest参数
    this.call(obj, ...rest, ...rest_)
  }
}

// softBind: 原生bind函数多次调用会以第一次绑定的this为准，softBind以最后一次绑定的this为准
Function.prototype.softBind = function(obj, ...rest){
  const self = this
  return function(...rest_){
    self.call(obj, ...rest, ...rest_)
  }
}

// 对指定的函数进行封装，首先检查调用时的 this，如果 this 绑定到全局对象或者 undefined，那就用指定的thisCtx 去调用函数，否则不会修改 this
Function.prototype.softBind = function(obj, ...rest) {
  const fn = this
  const bound = function(...args) {
    const o = !this || this === (window || global) ? obj : this
    return fn.apply(o, [...rest, ...args])
  }

  bound.prototype = Object.create(fn.prototype)
  return bound
}

// call
Function.prototype.fakeCall = function(obj, ...args){
  // 注意：Symbol()函数不能与new关键字一起作为构造函数使用，这是为了避免创建符号包装对象。
  let sym = Symbol('func')
  obj[sym] = this
  let res = obj[sym](...args)
  delete obj[sym]
  return res
}

// apply
Function.prototype.fakeApply = function(obj, args){
  let sym = Symbol('func')
  obj[sym] = this
  let res = obj[sym](...args)
  delete obj[sym]
  return res
}