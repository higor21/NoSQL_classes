

const express = require('express');
const app = express();
// package to connect the redis db
const redis = require('redis'); 
const client = redis.createClient();
const port = 3000;

client.on('error', (e) => {
  console.log(`${e}`)
})

client.on('connect', () => {
  console.log('REDIS connected')
})

app.post('/produce/:notification', function (req, res) {
  const notification = req.params.notification
  client.lpush(['nots-list', notification], (err, reply) => {
      if(!err) console.log(reply)
      else console.log(`error: ${err}`)
  })
});

app.get('/consume', function (req, res) {
    client.rpop('nots-list', (err, reply) => {
        if(!err) res.send(reply)
    })
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
