// Array.prototype.isArray()
// 默认情况下，toString() 方法被每个 Object 对象继承。
// 如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型
Array.prototype.fakeIsArray = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

// test
console.log(Array.prototype.fakeIsArray(Array.prototype))
