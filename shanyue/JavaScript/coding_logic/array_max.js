// 实现一个函数 max，找到数组中最大的一个值/两个值/N个值

// 使用sort，时间复杂度为O(nlog(n))
function maxSort(array, n) {
  const collection = [...(new Set(array))].sort()
  return collection.splice(collection.length - n)
}

// 求最大的一个值
function max(array) {
  return array.reduce((prev, next) => {
    return prev < next ? next : prev
  })
}

// 求最大的两个值
function maxTwo(array) {
  const copy = [...array]
  const result = [max(copy)]
  while(copy.indexOf(result[0]) > 0){
    copy.splice(copy.indexOf(result[0]), 1)
  }
  result.push(max(copy))
  return result
}

// 求最大的N个值
function max(array, n) {
  const copy = [...array]
  const result = [max(copy)]
  for(let i = 0; i < n; ++i){
    while(copy.indexOf(result[i]) > 0){
      copy.splice(copy.indexOf(result[0]), 1)
    }
    result.push(max(copy))    
  }
  return result
}

// test
function generateRandomArray(n) {
  const array = []
  for(let i = 0; i < n; ++i){
    array.push(Math.floor(Math.random() * 200))
  }
  return array
}

const arr1 = generateRandomArray(200)
console.log(maxSort(arr1, 10))

const arr2 = generateRandomArray(200)
console.log(maxTwo(arr2))