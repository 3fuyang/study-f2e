// 统计字符串中出现次数最多的字符
// 使用Map集合的去重功能
function getFrequentChar(str){
  let map = new Map()
  const len = str.length
  let frequentChar = ''
  let max = 0
  for(let i = 0; i < len; ++i){
    if(!map.get(str[i])){
      map.set(str[i], {count: 0})
    }
    const obj = map.get(str[i])
    obj.count++
    if(obj.count > max){
      max = obj.count
      frequentChar = str[i]
    }
  }
  map = null
  return [frequentChar, max]
}

// test
//=> ['a', 6]
console.log(getFrequentChar('aaabbaaacc'))

//=> ['a', 3]
console.log(getFrequentChar('aaa'))