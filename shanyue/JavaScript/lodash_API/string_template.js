// _.template([string=''], [options=]) 与lodash的API不同，是一个简单的模板渲染器
// 题目使用mustache syntax(小胡子语法)标志绑定

function render(template, data) {
  // 注意：replace中传入函数的捕获组参数(flags)在v8内核(Node.js和Chrome)中不起作用
  
  // 将模板中的'["a"]'转化成'.a'
  let parsed = template.replace(/\[(?:'|")([^\[\]]*)(?:'|")\]/g, `.$1`)

  // 以小胡子语法的前后为界，分割字符串为数组
  parsed = parsed.split(/(?=\{\{)|(?<=\}\})/g)

  // 获取data中表达式对应的属性
  for(let item of parsed){
    if(item[0] === '{'){
      const currIndex = parsed.indexOf(item)
      // 提取小胡子语法中的表达式，注意这里正则中匹配组内的写法，一定要精准
      const omitMustache = /\{\{\s*([_a-zA-Z\.]+)\s*\}\}/g
      item = omitMustache.exec(item)[1]
      // 以'.'为界分割表达式
      const params = item.split('.')
      // 使用reduce求取表达式的值
      item = params.reduce((prev, curr) => {
        return prev[curr]
      }, data)
      parsed.splice(currIndex, 1, item)
    }
  }

  return parsed.join('')
}

// test
const template = '{{ user["name"] }}，今天你又学习了吗 - 用户ID: {{ user.id }} {{ user["age"] }} 岁'

const data = {
  user: {
    id: 10086,
    name: '山月',
    age: 12
  }
}

//=> "山月，今天你又学习了吗 - 用户ID: 10086"
console.log(render(template, data))