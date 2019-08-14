const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();
const port = 3000;

client.on('error', (e) => {
  console.log(`error ${e}`)
})

client.on('connect', () => {
  console.log('REDIS connected')
})

function fatorial (n) {
  var fat = 1;
  while(n > 0) fat *= n--;
  return fat
}

app.get('/fatorial/:num', function (req, res) {
  const param = req.params.num
  client.get('fatorial:valor', (req, reply) => {
    if(!reply){
      client.set('fatorial:valor', fatorial(param), (req, reply) => {
        res.send(`novo valor: ${reply}`)
      })
    }else{
      res.send(`valor inalterado: ${reply}`)
    }
  })
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});

