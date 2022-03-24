// _.maxBy(array, [iteratee=_.identity]) 根据给定条件找到最大的数组项
function maxBy(array, keyBy) {
  const len = array.length
  let maxStandard = array[0]
  let maxItems = []
  for(let i = 0; i < len; ++i){
    const value = array[i]
    if(keyBy(maxStandard) === keyBy(value)){
      maxItems.push(value)
    }else if(keyBy(maxStandard) < keyBy(value)){
      maxStandard = value
      maxItems = [maxStandard]
    }
  }
  if(maxItems.length === 1){
    return maxItems[0]
  }
  return maxItems
}

// 使用归并，无法处理多个最大值
function maxByReduce(array, keyBy) {
  return array.reduce((prev, curr) => keyBy(prev) < keyBy(curr)?curr:prev)
}

// 使用归并，兼容多个最大值的情况
function maxBy(array, keyBy) {
  let result = [array[0]]
  array.reduce((prev, curr) => {
    //console.log(`执行一次归并,prev: ${prev},curr: ${curr}`)
    if(keyBy(prev) === keyBy(curr)){
      result.push(curr)
      //console.log(`相等分支, curr进栈, prev:${prev},curr: ${curr},result: ${result}`)
      return prev
    }else if(keyBy(prev) < keyBy(curr)){
      result = [curr]
      //console.log(`更新分支, 重新初始化result, prev:${prev},curr: ${curr},result: ${result}`)
      return curr
    }
    return prev
  })
  if(result.length === 1){
    return result[0]
  }else{
    return result
  }
}

// test
const data = [{ value: 6 }, { value: 2 }, { value: 4 }]
const dataMultipleMax = [{ value: 3 }, { value: 5 }, { value: 4 }, { value: 5 }]

//=> { value: 6 }
console.log(maxBy(data, x => x.value))
console.log(maxByReduce(data, x => x.value))
console.log(maxByMultiple(dataMultipleMax, x => x.value))