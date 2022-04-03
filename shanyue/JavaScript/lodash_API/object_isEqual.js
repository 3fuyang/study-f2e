// 深比较：仅比较值是否相等，不检查引用。
function isEqual(source, other){
  const type = Object.prototype.toString.call(source)
  const type_ = Object.prototype.toString.call(other)
  // 如果两者类型不同，则不相等
  if(type !== type_) return false
  // Number
  if(type === '[object Number]'){
    if(isNaN(source) && isNaN(other)) return true
    return source === other
  }
  // String, Boolean, Symbol
  else if(/String|Boolean|Symbol/.test(type)){
    return source === other
  }
  // Undefined, Null
  else if(/Undefined|Null/.test(type)){
    return true
  }
  // Date
  else if(type === '[object Date]'){
    return source.valueOf() === other.valueOf()
  }
  // RegExp
  else if(type === '[object RegExp]'){
    return source.toString === other.toString
  }
  // Object, Array
  else{
    const keysX = Object.keys(source);
    const keysY = Object.keys(other);
    // 两者可迭代属性数量不同，则不相等
    if (keysX.length !== keysY.length) {
      return false;
    }
    // 逐个递归比较属性
    for (const key of keysX) {
      if(!isEqual(source[key], other[key])) {
        return false;
      }
    }
    return true;
  }
}

// test
var object = { 'a': 1 }
var other = { 'a': 1 }
 
console.log(isEqual(object, other))