// _.sampleSize
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

// test
console.log(sampleSize([1, 2, 3, 4, 5, 6, 7, 8], 4))