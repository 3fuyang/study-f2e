// 使用 JS 如何生成一个随机字符串，最多生成8位随机数（囿于Math.random()函数的返回值）
// numObj.toString([radix]) radix指定要用于数字到字符串的转换的基数(从2到36=9+27(英文字母的数量))。如果未指定 radix 参数，则默认值为 10。
// 如果转换的基数大于10，则会使用字母来表示大于9的数字，比如基数为16的情况，则使用a到f的字母来表示10到15。
function random(n) {
  // 由于Math.random()返回的是小数，需要从第2个位置（0.X）开始截取子串
  return Math.random().toString(36).slice(2, n + 2)
}

// test
console.log(random(6))

console.log(random(4))