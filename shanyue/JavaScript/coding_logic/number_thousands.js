// 给数字添加千位符
function numberThousands(num) {
  // 位置匹配
  const pattern = /(?!^)(?=(\d{3})+$)/g
  return num.toString().replace(pattern, ',')
}

// test
//=> '123'
console.log(numberThousands(123))

//=> '1,234,567'
console.log(numberThousands(1234567))