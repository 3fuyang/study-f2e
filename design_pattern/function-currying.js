// 函数柯里化(部分求值)：一个函数首先接收一些参数，但不会立即求值，而是继续返回另一函数，刚才传入的参数在函数形成的闭包中被保存起来。
// 待到函数真正被求值时，之前传入的所有参数都会被一次性用于求值。

// 场景：假设需要编写一个计算每月开销的函数，在每个月的前29天，我们都只是保存好当天的开销，直到第30天才进行求值计算。
const cost = (function(){
  const args = []
  return function(){
    if(arguments.length === 0){
      let sum = 0
      for(let item of args){
        sum += item
      }
      console.log(`本月花销总共为：${sum} 元。`)
    }else{
    Array.prototype.push.apply(args, arguments)
    }
  }
})();

cost(100)
cost(300)
cost(200)
cost(120)
cost()