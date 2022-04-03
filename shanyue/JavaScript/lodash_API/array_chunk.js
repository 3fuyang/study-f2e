// _.chunk(array, [size=1])
// 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 
// 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。

// 使用reduce
function chunk(array, size = 1){
  const result = []
  const len = array.length
  let rounds = 0
  // 注意：Math.floor()是向下取整，Math.ceil()是向上取整
  for(let i = 0; i < Math.ceil(len / size); ++i){
    const copy = [...array]
    copy.splice(0, size * rounds)
    result.push(
      copy.reduce((prev, curr, index, arr) => {
        prev.push(curr)
        // 一组分割完成后，提前终止reduce
        if((index + 1)%size === 0){
          arr.splice(index)
        }
        return prev
      }, [])
    )
    rounds++
  }
  return result
}

// 利用splice
function chunk_(array, limit) {
  // 预处理，讨论size小于array长度的情况
  limit = array.length <= limit ? array.length : limit;
  const result = [];
  while(array.length) {
    result.push(array.splice(0, limit));
  }
  return result;
}

// test
console.log(chunk(['a', 'b', 'c', 'd'], 2))
console.log(chunk_(['a', 'b', 'c', 'd'], 2))
// => [['a', 'b'], ['c', 'd']]
 
console.log(chunk(['a', 'b', 'c', 'd'], 3))
console.log(chunk_(['a', 'b', 'c', 'd'], 3))
// => [['a', 'b', 'c'], ['d']]