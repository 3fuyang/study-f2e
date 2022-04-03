import useBubbleSort from './bubble_sort.js'
import useSelectSort from './select_sort.js'
import useInsertSort from './insert_sort.js'
import useMergeSort from './merge_sort.js'
import useQuickSort from './quick_sort.js'
function generateRandomArray(n) {
  const array = []
  for(let i = 0; i < n; ++i){
    array.push(Math.floor(Math.random() * 200))
  }
  return array
}

const f = generateRandomArray

console.log(useBubbleSort(f(50)))
console.log(useSelectSort(f(50)))
console.log(useInsertSort(f(50)))
console.log(useMergeSort(f(50)))
console.log(useQuickSort(f(10)))