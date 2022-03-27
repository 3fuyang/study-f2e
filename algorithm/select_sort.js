// 选择排序 复杂度O(n**2)
export default function selectSort(array) {
  const len = array.length
  for(let i = 0; i < len; ++i){
    let minPos = i
    for(let j = i; j < len; ++j){
      minPos = array[minPos] > array[j] ? j : minPos
    }
    [array[i], array[minPos]] = [array[minPos], array[i]]
  }
  return array
}