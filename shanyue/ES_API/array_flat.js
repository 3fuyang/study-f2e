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
function flatten (list, depth = 1) {
  if (depth === 0) return list
  return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b, depth - 1) : b), [])
}

// test
const a = Array.prototype.fakeFlat([1, 2, 3, [4, [5, 6]]])
const b = Array.prototype.fakeFlat([1, 2, 3, [4, [5, 6]]], 2)

console.log(a, b)