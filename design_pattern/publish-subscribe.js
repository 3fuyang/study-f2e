// 5.发布者-订阅者模式
// 它与观察者模式的区别在于，subject和object之间多出一个broker

// 局部发布-订阅模式（观察者模式）
const events = {
  clientList: new Map(),  // 缓存列表
  listen: function(key, fn){  // 添加订阅者
    if(!this.clientList.get(key)){  // key为订阅者指定想要订阅的信息的关键词
      this.clientList.set(key, new Set())
    }
    this.clientList.get(key).add(fn)
  },
  trigger: function(){  // 发布消息
    let key = Array.prototype.shift.call(arguments),
      funcs = this.clientList.get(key)

    if(!funcs || funcs.size === 0){
      return false
    }

    for(let func of funcs.values()){
      func.apply(this, arguments)  // arguments是发布消息时携带的参数
    }
  },
  remove: function(key, fn){ // 取消订阅
    let funcs = this.clientList.get(key)
    if(!funcs){
      return false
    }
    if(!fn){  // 若未传递具体的回调函数，则取消该关键词对应的所有订阅
      funcs.clear()
    }else{
      funcs.delete(fn)
    }
  }
}

// 为任何对象安装发布-订阅功能（即复制event对象的所有属性）
const installEvent = function(obj){
  for(let item in events){
    obj[item] = events[item]
  }
}

// 全局发布-订阅模式
// 可以实现模块之间的通信
const event = (function(){
  let clientList = new Map(),
    listen,
    trigger,
    remove
  listen = function(key, fn){
    if(!clientList.get(key)){
      clientList.set(key, new Set())
    }
    clientList.get(key).add(fn)
  }
  trigger = function(){
    const key = Array.prototype.shift.call(arguments),
      fns = clientList.get(key)
    if(!fns || fns.size === 0){
      return false
    }
    for(let item of fns.values()){
      item.apply(this, arguments)
    }
  }
  remove = function(key, fn){
    let funcs = this.clientList.get(key)
    if(!funcs){
      return false
    }
    if(!fn){
      funcs.clear()
    }else{
      funcs.delete(fn)
    }
  }

  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  }
})()