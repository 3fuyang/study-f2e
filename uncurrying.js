// call与apply方法允许我们将任何对象当作this传入某个方法，
// 而uncurrying(反柯里化)则是这种泛化this的过程的提取。

Function.prototype.uncurrying = function(){
  var self = this // self存储的是调用uncurrying方法的Function对象
  return function(){
    var obj = Array.prototype.shift.call(arguments) // 从类数组特殊对象arguments中提取第一个参数（即目标对象obj）
    console.log(obj)
    return self.apply( obj, arguments ) // 对转化后的参数对象调用原生方法，注意这里的arguments相比上一行已经删除了首元素obj
  }
}

// 另一种实现方式
Function.prototype.uncurrying_2 = function(){
  var self = this
  return function(){
    return Function.prototype.call.apply( self, arguments )
  }
}

// 举例，泛化Array的push方法
let push = Array.prototype.push.uncurrying()
let obj = { // 类数组对象
  "length": 1,
  "0": 1
}

// 将反柯里化实例的参数分为：目标Obj和其他普通的参数
push(obj, 2)
console.log(obj)