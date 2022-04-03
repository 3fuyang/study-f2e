// _.sampleSize
import { useShuffle } from './array_shuffle.js'
function sampleSize(collection, size = 1){
  const len = collection.length
  const bin = []
  for(let i = 0; i < size; ++i){
    let sample
    do{
      sample = collection[Math.floor(Math.random() * len)]
      // 注意：Array.prototype.indexOf()方法如果不存在，返回-1，要用>0判断
    }while(bin.indexOf(sample) > 0)
    bin.push(sample)
  }
  return bin
}

// 可以结合shuffle实现
function sampleSizeShuffle(collection, size = 1) {
  return useShuffle(collection).splice(0, size)
}
// test
console.log(sampleSize([1, 2, 3, 4, 5, 6, 7, 8], 4))
console.log(sampleSizeShuffle([1, 2, 3, 4, 5, 6, 7, 8], 4))