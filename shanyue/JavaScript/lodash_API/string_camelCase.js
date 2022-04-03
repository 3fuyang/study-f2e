// _.camelCase([string='']) 转换字符串string为驼峰写法。
function camelCase(str){
  // 思路：先字母全小写化，再大写边界字母，再删除所有间隔符号，再小写首字母
  let res = str.toLowerCase()
  const pattern = /[_-\s]+([a-zA-Z])/g
  res = res.replace(pattern, (match, captured) => {
    return captured?captured.toUpperCase():''
  })
  res = res.replace(/[-_\s]/g, '')
  return res[0].toLowerCase() + res.substr(1)
}
// test
console.log(camelCase('Foo Bar'))
// => 'fooBar'
 
console.log(camelCase('--foo-bar--'))
// => 'fooBar'
 
console.log(camelCase('__FOO_BAR__'))
// => 'fooBar'