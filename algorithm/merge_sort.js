// 归并排序 复杂度O(nlog(n))
export default function mergeSort(array) {
  const len = array.length
  if(len > 1){
    const middle = Math.floor(len / 2)
    const left = mergeSort(array.slice(0, middle))
    const right = mergeSort(array.slice(middle, len))
    array = merge(left, right)
  }
  return array
}

function merge(left, right){
  const res = []
  const lenL = left.length, lenR = right.length
  let i = 0, j = 0
  while(i < lenL && j < lenR){
    res.push(left[i] < right[j] ? left[i++] : right[j++])
  }
  if(i !== lenL){
    res.push(...left.slice(i))
  }else if(j !== lenR){
    res.push(...right.slice(j))
  }
  return res
}