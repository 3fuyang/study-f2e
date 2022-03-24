// _.keyBy(collection, [iteratee=_.identity]):Object
/* 创建一个对象组成，key（键）是collection（集合）中的每个元素经过iteratee（迭代函数）处理后返回的结果。 
每个key（键）对应的值是生成key（键）的最后一个元素。iteratee（迭代函数）调用1个参数：(value)。 */
function keyBy(collection, iteratee) {
  return collection.reduce((prev, curr) => {
    prev[iteratee(curr)] = curr
    return prev
  }, {})
}

// test
const keys = keyBy([{ id: 1, name: '山月' }, { id: 2, name: 'shanyue' }], x => x.id)
console.log(keys)