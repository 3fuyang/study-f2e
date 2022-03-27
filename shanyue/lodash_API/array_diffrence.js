// _.difference(array, [values]) 差集
// 创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。
function difference(source, ...arrs){
  const res = new Set(source)
  let iter = res.values()
  for(let arr of arrs){
    for(let item of iter){
      //console.log(`当前检测给定数组为${arr}，迭代器值为${item}，在给定数组中索引值为${arr.indexOf(item)}`)
      if(arr.indexOf(item) >= 0){
        res.delete(item)
      }
    }
    // 注意：修改了原集合后，需要重新取得迭代器
    iter = res.values()
  }
  return Array.from(res)
}

// test
//=> [1]
const r1 = difference([2, 1], [2, 3])

//=> [1, 9]
const r2 = difference([1, 2, 9], [3, 4, 2])

//=> [5]
const r3 = difference([1, 5, 0], [1, 3, 2], [9, 2, 0])

console.log(r1, r2, r3)

// intersection 求交集
function intersection(source, ...arrs){
  // 去重
  const copy = Array.from(new Set(source))
  // 过滤
  return copy.filter((item) => {
    for(let arr of arrs){
      if(arr.indexOf(item) < 0){
        return false
      }
    }
    return true
  })
}

// test
//=> [2]
const i1 = intersection([2, 1], [2, 3])

//=> [2]
const i2 = intersection([1, 2, 9], [3, 4, 2])

//=> []
const i3 = intersection([1, 5, 0], [1, 3, 2], [9, 2, 0])

console.log(i1, i2, i3)