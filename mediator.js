// 11.中介者模式：解除对象与对象之间的紧耦合关系（笛卡尔积），通过中介者对象转发所有相关对象的通信。
const playerDirector = (function(){
  const players = {}, operations = {}
  operations.addPlayer = function(player){
    let teamColor = player.teamColor
    players[teamColor] = players[teamColor] || []
    players[teamColor].push(player)
  }
  let ReceiveMessage = function(){
    let message = Array.prototype.shift.call(arguments)
    operations[message].apply(this, arguments)
  }
  return {
    receiveMessage: ReceiveMessage
  }
})()

function Player(name, teamColor){
  this.name = name
  this.teamColor = teamColor
  this.state = 'alive'
}

Player.prototype.win = function(){
  console.log(this.name + `won`)
}

Player.prototype.lose = function(){
  console.log(this.name + `lose`)
}

Player.prototype.die = function(){
  this.state = 'dead'
  playerDirector.ReceiveMessage('playerDead', this)
}

const playerFactory = function(name, teamColor){
  let newPlayer = new Player(name, teamColor)
  playerDirector.ReceiveMessage('addPlayer', newPlayer)
  return newPlayer
}