/*
  请实现一个 sum 函数，接收一个数组 arr 进行累加，并且只能使用add异步方法
  
  add 函数已实现，模拟异步请求后端返回一个相加后的值
*/
function add(a, b) {
  return Promise.resolve(a + b);
}

// 串行
function sumSerial(arr) {
  if (arr.length === 1) return arr[0]
  // 使用Promise.resolve()将前一个结果包装为Promise，有序推入微任务队列，保证每次相加能获取上一次的结果
  return arr.reduce((x, y) => Promise.resolve(x).then(x => add(x, y)))
}
// 利用栈的串行
async function sumSerialWithStack(arr){
  let res = 0;
  if(arr.length === 0) return res;
  if(arr.length === 1) return arr[0];

  let a = arr.pop();
  let b = arr.pop();
  arr.push(await add(a, b));
  return sum(arr)
}

// 并行
// 分组函数
function chunk(array, size = 1){
  const limit = array.length > size ? size : array.length
  const copy = [...array]
  const res = []
  while(copy.length){
    res.push(copy.splice(0, limit))
  }
  return res
}

function sumParallel(array){
  if(array.length === 1) return array[0]
  // 注意：这里对解构赋值中的后一项b的操作既处理了数组长度为奇数的情形，又作为递归结束条件
  const promises = chunk(array, 2).map(([a, b]) => b === undefined ? a : add(a, b))
  return Promise.all(promises).then(list => sumParallel(list))
}

// 并发控制: 使用前面实现的Promise.map()函数

// test
// =>21
sumSerial([1, 2, 3, 4, 5, 6]).then((value) => console.log(value))
sumParallel([1, 2, 3, 4, 5, 6]).then((value) => console.log(value))