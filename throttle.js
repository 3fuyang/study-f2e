// 节流
function throttle(fn, delay){
  let self = fn, timer, firstTime = true
  return function(){
    let args = arguments, me = this
    if(firstTime){
      self.apply(me, args)
      return firstTime = false
    }else if(timer){
      return false
    }else{
      timer = setTimeout(()=>{
        clearTimeout(timer)
        timer = null
        self.apply(me, args)
      }, delay || 500)
    }
  }
}