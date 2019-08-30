const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();
const port = 3001;

client.on('error', (e) => {
  console.log(`${e}`)
})

client.on('connect', () => {
  console.log('REDIS connected')
})

// parâmetros de URL: 'member' e 'score'
app.get('/new', function (req, res) {
  var score = req.query.score
  var member = req.query.member
  client.zadd('zlist', score, member, (err, reply) => {
    if(!err)
      res.send(`player ${member} com score=${score} adicionado com sucesso!!`)
    else
      res.send(`error: ${err}`)
  })
})

// parâmetros de URL: 'member' e 'score'
app.get('/add_score', function (req, res) {
  var score = req.query.score
  var member = req.query.member
  client.zincrby('zlist', score, member, (err, reply) => {
    if(!err){
      res.send(`player ${member} com novo score = ${reply}!!`)
    }else
      res.send(`error: ${err}`)
  })
})

// parâmetros de URL: 'member' e 'score'
app.get('/remove_score', function (req, res) {
  var score = req.query.score
  var member = req.query.member  
  client.zscore('zlist', member, (err, current_score) => {
    if(current_score - score >= 0){
      client.zincrby('zlist', -score, member, (err, reply) => {
        if(!err){
          res.send(`player ${member} com novo score = ${reply}!`)
        }else
          res.send(`error: ${err}`)
      })
    }else{
      res.send(`Score não pode ser atualizado, pois jogador não pode ter 'score' negativo`)
    }
  })
})

app.get('/list_ten_players', function (req, res) {
  client.zrevrangebyscore('zlist', '+inf', '-inf', 'withscores' ,'LIMIT', 0, 10, (err, members) => {
    if(!err){
      var list = []
      members.forEach((m, i) => {
        if(i%2==0){
          list.push({name: m, score: null})
        }else{
          list[parseInt(i/2)].score = m
        }
      })
      res.json(list)
    }else
      res.send(`error: ${err}`)
  })
})

// parâmetro: 'pos'
app.get('/find_by_position/:pos', function (req, res) {
  var pos = req.params.pos
  client.zcard('zlist', (err, n) => {
    if(pos > 0 && pos <= n){
      client.zrevrange('zlist', pos-1, pos-1, 'withscores', (err, player) => {
        if(!err)
          res.send(`player ${player[0]} com score ${player[1]}!`)
        else
          res.send(`error: ${err}`)
      })
    }else{
      res.send(`posição inválida`)
    }
  })
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
