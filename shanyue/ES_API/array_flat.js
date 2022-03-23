// Array.prototype.flat()
// 原创的使用迭代器的实现
Array.prototype.fakeFlat = function(target, depth = 1) {
  const copy = [...target]
  for(let i = 0; i < depth; ++i){
    const iter = copy[Symbol.iterator]()
    let item = null
    for(item = iter.next(); !item.done; ){
      // 注意：迭代器并不与可迭代对象某个时刻的快照绑定，而仅仅是用游标来记录遍历可迭代对象的历程，
      // 如果可迭代对象在迭代期间被修改了，那么迭代器也会反映相应的变化
      if(Array.isArray(item.value)){
        const temp = [...item.value]
        let size = temp.length
        for(let j = 0; j < size; ++j){
          item = iter.next()
        }
        copy.splice(copy.indexOf(item.value), 1, ...temp)
      }else{
        item = iter.next()
      } 
    }
    /* for(let item of copy){
      if(Array.isArray(item)){
        const temp = [...item]
        copy.splice(copy.indexOf(item), 1, ...temp)
      }
    } */
  }
  return copy
}

// 使用数组reduce和merge的递归实现
function flatten(target, depth = 1){
  if(depth === 0) return [...target]
  // Array.prototype.reduce(callback(prev, curr, currIndex, array), ?initialValue)
  // 注意：Array.prototypr.concat方法会自动打平参数的一层数组
  return target.reduce((prev, curr) => prev.concat(Array.isArray(curr)?flatten(curr, --depth):curr), [])
}

// test
console.log(new Date())
const a = Array.prototype.fakeFlat([1, 2, 3, [4, [5, 6]]])
const b = Array.prototype.fakeFlat([1, 2, 3, [4, [5, 6]]], 2)
console.log(new Date())

// 使用reduce和concat性能上要好很多
console.log(new Date())
const aa = flatten([1, 2, 3, [4, [5, 6]]])
const bb = flatten([1, 2, 3, [4, [5, 6]]], 2)
console.log(new Date())

console.log(a, b)
console.log(aa, bb)