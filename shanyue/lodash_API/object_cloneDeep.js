// 深拷贝要点:  1. JavaScript内置对象的复制: Set、Map、Date、Regex等 2. 循环引用问题
// 可以参考：https://juejin.cn/post/7013603488315736072#heading-2
function cloneDeepJSON(obj){
  /* 会忽略 undefined和symbol；
  不可以对Function进行拷贝，因为JSON格式字符串不支持Function，在序列化的时候会自动删除；
  诸如 Map, Set, RegExp, Date, ArrayBuffer 和其他内置类型在进行序列化时会丢失；
  不支持循环引用对象的拷贝;（循环引用的可以大概地理解为一个对象里面的某一个属性的值是它自己） */

  return JSON.parse(JSON.stringify(obj))
}

// 递归实现深拷贝，无法解决循环引用和Object外的引用类型
function cloneDeepDi(obj){
  const newObj = {};
  let keys = Object.keys(obj);
  let key = null;
  let data = null;
  for(let i = 0; i<keys.length;i++){
    key = keys[i];
    data = obj[key];
    if(data && typeof data === 'object'){
      newObj[key] = cloneDeepDi(data)
    }else{
      newObj[key] = data;
    }
  }
  return newObj
}


function cloneDeep(source, memory = null){
  // 检验是否是原始数据类型
  const isPrimitive = (value) => /Number|Boolean|String|Null|Undefined|Symbol|Function/.test(Object.prototype.toString.call(value))
  let result = null

  memory || (memory = new WeakMap())
  // 原始数据类型及函数
  if(isPrimitive(source)){
    result = source
  }
  // 数组
  else if(Array.isArray(source)){
    // 遍历递归调用深拷贝
    result = source.map((item) => cloneDeep(item, memory))
  }
  // 内置基本引用类型Date, RegExp
  else if(Object.prototype.toString.call(source) === '[object Date]'){
    result = new Date(source)
  }
  else if(Object.prototype.toString.call(source) === '[object RegExp]'){
    result = new RegExp(source)
  }
  // 集合引用类型Set, Map
  else if(Object.prototype.toString.call(source) === '[object Set]'){
    result = new Set()
    for(const value of source){
      result.add(cloneDeep(value, memory))
    }
  }
  else if(Object.prototype.toString.call(source) === '[object Map]'){
    result = new Map()
    for(const [key, value] of source.entries()){
      result.set(key, cloneDeep(value, memory))
    }
  }  
  // 其余集合引用类型(Object, WeakMap, WeakSet)
  else{
    if(memory.has(source)){
      result = memory.get(source)
    }else{
      result = Object.create(null)
      memory.set(source, result)
      Object.keys(source).forEach((key) => {
        const value = source[key]
        result[key] = cloneDeep(value, memory)
      })
    }
  }
  return result
}

// test
const obj = {
  re: /hello/,
  f () {console.log('This is a Function.')},
  date: new Date(),
  map: new Map(),
  list: [1, 2, 3],
  a: 3,
  b: 4
}

let a = cloneDeepJSON(obj), b = cloneDeepDi(obj), c = cloneDeep(obj)
console.log(a)
console.log(b)
console.log(c)
console.log(a === obj)
console.log(b === obj)
console.log(b === obj)
c.f()