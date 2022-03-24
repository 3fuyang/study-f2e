/* shuffle(collection):Array 创建一个被打乱的集合
参数: collection (Array|Object): 要打乱的集合。
返回: (Array): 返回打乱的新数组。 */

// 使用sort
function shuffleSort(collection) {
  return collection.sort((a, b) => {
    if(Math.random() < 0.5){
      return -1
    }else{
      return 1
    }
  })
}

// 根据随机索引交换数组元素
function shuffleIndex(collection){
  const len = collection.length
  const result = [...collection]
  for(let i = 0; i < len; ++i){
    const swapIndex = Math.floor(Math.random() * len)
    const temp = result[swapIndex]
    result[swapIndex] = result[i]
    result[i] = temp
  }
  return result
}

// test
console.log(shuffleSort([1, 2, 3, 4, 5, 6, 7, 8, 9]))
console.log(shuffleIndex([1, 2, 3, 4, 5, 6, 7, 8, 9]))

// 生成一个不重复的6位数字短信验证码
const getCAPTCHA = (function CAPTCHA(){
  const usedCAPTCHA = new Set()
  return () => {
    let result = ''
    do{
      for(let i = 0; i<6; ++i){
        result += Math.floor(Math.random()*10).toString()
      }
    }while(usedCAPTCHA.has(result))
    usedCAPTCHA.add(result)
    return result
  }
})()

// test
for(let i = 0; i < 10; ++i){
  console.log(getCAPTCHA())
}