// 单例模式

// 管理单例职责
const singletonFactory = (fn) => {
  let obj
  return function() {
    if(!obj){
      obj = fn.apply(this, arguments)
    }
    return obj
  }
}

// 测试
// 创建单例职责
const createSingleton = (name) => {
  const singleInstance = {
    name: name
  }
  return singleInstance
}

const getSingleton = singletonFactory(createSingleton)

const o1 = getSingleton('him')
const o2 = getSingleton('her')
console.log(o2)
console.log( o1 === o2 )