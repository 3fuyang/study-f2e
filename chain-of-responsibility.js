// 10.职责链模式：一系列可能会处理请求的对象被连接成一条链，请求在这些对象间依次传递，直到有一个对象处理它为止，
// 解除请求的发送者和接收者之间的强耦合关系，发送者只需要知道链中的第一个节点。

// 灵活可拆分的职责链节点
const order500 = (orderType, pay, stock) => {
  if(orderType === 1&&pay === true){
    console.log(`500元定金预购，得到100元优惠券`)
  }else{
    return `nextSuccessor`
  }
}

const order200 = (orderType, pay, stock) => {
  if(orderType === 2&&pay === true){
    console.log(`200元定金预购，得到50元优惠券`)
  }else{
    return `nextSuccessor`
  }
}

const orderNormal = (orderType, pay, stock) => {
  if(stock>0){
    console.log(`普通购买，无优惠券`)
  }else{
    console.log(`库存不足`)
  }
}

const Chain = function(fn){
  this.fn = fn
  this.successor = null
}

Chain.prototype.setSuccessor = function(successor){
  return this.successor = successor
}

Chain.prototype.passRequest = function(){
  const ret = this.fn.apply(this, arguments)
  if(ret === `nextSuccessor`){
    return this.successor && this.successor.passRequest.apply(this.Successor, arguments)
  }
}

order500.setSuccessor(order200)
order200.setSuccessor(orderNormal)