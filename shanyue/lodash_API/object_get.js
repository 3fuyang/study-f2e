// _.get(object, path, [defaultValue])
// 根据object对象的path路径获取值。如果解析value是undefined会以defaultValue取代。
/* var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.get(object, 'a[0].b.c');
// => 3
 
_.get(object, ['a', '0', 'b', 'c']);
// => 3
 
_.get(object, 'a.b.c', 'default');
// => 'default' */

// path(Array或String)由index和property两种单元构成
// 在Array中index表现为数字（类型为字符串），property表现为字符串
// 在String中index表现为'[0]'，property表现为'.attr'
function get(object, path, ...defaultValue){
  let result = object
  // Array
  if(Array.isArray(path)){
    for(let item of path){
      result = result[item]
    }
  }
  // String
  else{
    // 预处理
    if(path[0] === '.'){
      path = path.substr(1, -1)
    }
    // 转化成数组
    const arr = path.split('.')
    // 解析'[]'
    const parsed = []
    for(let item of arr){
      for(let unit of item.split(/(?=\[)/)){
        if(unit[0] !== '['){
          parsed.push(unit)
        }else{
          parsed.push(/\[(.+)\]/.exec(unit)[1])
        }
      }
    }

    for(let item of parsed){
      result = result[item]
    }
  }
  return result === undefined?defaultValue[0]:result
}

// test
const object = { 'a': [{ 'b': { 'c': 3 } }] }

let res = get(object, ['a', '0', 'b', 'c'])

console.log(res)

res = get(object, 'a[0].b.c')

console.log(res)