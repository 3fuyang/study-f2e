// 输入一个整数，如果能够被3整除，则输出 Fizz
// 如果能够被5整除，则输出 Buzz
// 如果既能被3整数，又能被5整除，则输出 FizzBuzz
function fizzbuzz(num) {
  if(num % 3 === 0 && num % 5 === 0){
    console.log('FizzBuzz')
  }else if(num % 3 === 0){
    console.log('Fizz')
  }else if(num % 5 === 0){
    console.log('Buzz')
  }else{
    console.log(num)
  }
}

// test
//=> 'fizz'
fizzbuzz(3)

//=> 'buzz'
fizzbuzz(5)

//=> 'fizzbuzz'
fizzbuzz(15)

//=> 7
fizzbuzz(7)