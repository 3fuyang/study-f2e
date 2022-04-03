// _.sample(collection) 返回随机元素
function sample(collection) {
  const len = collection.length
  return collection[Math.floor(Math.random() * len)]
}

// test
console.log(sample([1, 2, 3, 4, 5 , 6, 7]))