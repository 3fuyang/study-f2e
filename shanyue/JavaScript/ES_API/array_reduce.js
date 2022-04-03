// Array.prototype.reduce((prev, curr, currIndex, array) => {}, ?initialValue)
Array.prototype.fakeReduce = function(callback, ...initialValue){
  const len = this.length
  let prev = initialValue.length?initialValue[0]:this[0]
  for(let i = initialValue.length ? 0 : 1; i < len; ++i){
    prev = callback(prev, this[i], i, this)
  }
  return prev
}

// test
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// => 55
console.log(arr.fakeReduce((x, y) => x + y))

// => 155
console.log(arr.fakeReduce((x, y) => x + y, 100))

// => NaN
console.log(arr.fakeReduce((x, y) => x + y, undefined))

// 在 lodash 中为 NaN
// 在原生API 中为 15
const arr_ = [1, 2, 3, 4, 5,,,,,,,,,,,]
console.log(arr_.fakeReduce((x, y) => x + y, undefined))