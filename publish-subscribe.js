// 5.发布者-订阅者模式
// 它与观察者模式的区别在于，subject和object之间多出一个broker

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
  }
}

// 为任何对象安装发布-订阅功能（即复制event对象的所有属性）
const installEvent = function(obj){
  for(let item in events){
    obj[item] = events[item]
  }
}

// 举例
const salesOffices = {}
installEvent(salesOffices)

salesOffices.listen('squareMeter88', (price) => { // 添加一个订阅
  console.log(`价格为：${price}`)
})

salesOffices.listen('squareMeter100', (price) => { // 添加另一个订阅
  console.log(`价格为：${price}`)
})

salesOffices.trigger('squareMeter88', 2000000)
salesOffices.trigger('squareMeter100', 3000000)