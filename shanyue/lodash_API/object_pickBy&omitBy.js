// _.pickBy(object, [predicate=_.identity])
// 创建一个对象，这个对象组成为从 object 中经 predicate 判断为真值的属性。 predicate调用2个参数：(value, key)。
function pickBy(object, fn) {
  const result = {}
  for(let property in object){
    if(fn(object[property])) {
      result[property] = object[property]
    }
  }
  return result
}

function isNumber(x) {
  if(typeof x === 'number') return true
  return false
}

// _.omitBy(object, [predicate=_.identity])
// 反向版_.pickBy；这个方法一个对象，这个对象忽略 predicate（断言函数）判断不是真值的属性后，
// object自身和继承的可枚举属性组成。predicate调用与2个参数：(value, key)。
function omitBy(object, fn) {
  const result = {}
  for(let property in object) {
    if(!fn(object[property])){
      result[property] = object[property]
    }
  }
  return result
}
// test
const object = { 'a': 1, 'b': '2', 'c': 3 }

console.log(pickBy(object, isNumber))
// => { 'a': 1, 'c': 3 }