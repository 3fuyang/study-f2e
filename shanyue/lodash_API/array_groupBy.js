// _.groupBy(collection, [iteratee=_.identity])
function groupBy(collection, iteratee) {
  return collection.reduce((prev, curr) => {
    let property = (typeof iteratee === 'function')?iteratee(curr):curr[iteratee]
    if(!prev[property]){
      prev[property] = []
    }
    prev[property].push(curr)
    return prev
  }, {})
}
// test
console.log(groupBy([6.1, 4.2, 6.3], Math.floor))
// => { '4': [4.2], '6': [6.1, 6.3] }
 
// The `_.property` iteratee shorthand.
console.log(groupBy(['one', 'two', 'three'], 'length'))
// => { '3': ['one', 'two'], '5': ['three'] }

