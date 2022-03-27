// 插入排序 复杂度O(n**2)
export default function insertSort(array) {
  const len = array.length
  for(let i = 0; i < len; ++i){
    let temp = array[i]
    let j = i - 1
    while(j >= 0 && array[j] > temp){
      array[j+1] = array[j]
      j--
    }
    array[j+1] = temp
  }
  return array
}