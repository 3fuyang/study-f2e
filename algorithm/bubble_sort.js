// 冒泡排序 复杂度O(n**2)
export default function bubbleSort(array) {
  const len = array.length
  for(let i = 0; i < len; ++i){
    for(let j = 0; j < len - i - 1; ++j){
      if(array[j] > array[j + 1]){
        [array[j], array[j+1]] = [array[j+1], array[j]]
      }
    }
  }
  return array
}