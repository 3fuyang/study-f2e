// 对以下字符串进行压缩编码
// Input: 'aaaabbbccd'
// Output: 'a4b3c2d1'，代表 a 连续出现四次，b连续出现三次，c连续出现两次，d连续出现一次
function encode(str){
  const pattern = /([a-zA-Z])\1+/g
  return str.replace(pattern, (match, p1) => `${p1}${match.length}`)
}

// 对连续出现1次的编码进行省略
function encodeOmitOnce(str){
  const pattern = /([a-zA-Z])\1+/g
  return str.replace(pattern, (match, p1) => match.length > 1 ? `${p1}${match.length}` : `${p1}`)
}

// test
//=> a4b3c2
console.log(encode('aaaabbbcc'))

//=> a4b3a4
console.log(encode('aaaabbbaaaa'))

//=> a2b2c2
console.log(encode('aabbcc'))