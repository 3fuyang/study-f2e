// String.prototype.trim()
String.prototype.fakeTrim = function(){
  const trim = /^\s*([^\s]+[^]*[^\s]+)\s*$/g
  console.log(trim.exec(this)[1])
}

// 使用replace
const trim = str => str.trim || str.replace(/^\s+|\s+$/g, '')

// test
const str = '   foo   '
str.fakeTrim()