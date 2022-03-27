// 事件的发布-订阅模式:
// emit: 发布一个事件
// on: 监听一个事件
// once: 仅监听一次事件
// off: 取消一个事件监听
class Event {
  constructor(){
    this.bucket = new Map()  // 事件桶
  }

  emit (type, ...args) {
    let watchers = this.bucket.get(type)
    if(!watchers){
      return false
    }else{
      for(let watcher of watchers){
        watcher.fn(...args)
        if(watcher.once){
          watchers.delete(watcher)
        }
      }
    }
  }

  on (type, listener) {
    let watchers = this.bucket.get(type)
    if(!watchers){
      this.bucket.set(type, new Set([{fn: listener, once: false}]))
    }else{
      watchers.add({fn: listener, once: false})
    }
  }

  once (type, listener) {
    let watchers = this.bucket.get(type)
    if(!watchers){
      this.bucket.set(type, new Set([{fn: listener, once: true}]))
    }else{
      watchers.add({fn: listener, once: true})
    }    
  }

  off (type, listener) {
    let watchers = this.bucket.get(type)
    if(!watchers){
      return false
    }else{
      for(let item of watchers){
        if(item.fn === listener){
          watchers.delete(item)
          return true
        }
      }
    }
  }
}

// test
const e = new Event()

e.on('click', x => console.log(x.id))

e.once('click', x => console.log(x.id))

//=> 3
e.emit('click', { id: 3 })

//=> 4
e.emit('click', { id: 4 })

function printFoo(obj){
  console.log(obj.foo)
}

e.on('hover', printFoo)

//=> 'Bar'
e.emit('hover', { id: 0, foo: 'Bar'})

e.off('hover', printFoo)

e.emit('hover', { id: 2, foo: 'Zoo'})