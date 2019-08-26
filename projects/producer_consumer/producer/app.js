const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const redis = require('redis');
const client = redis.createClient();
const port = 3001;

let noticeAble = false

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true})); 

client.on('error', (e) => {
  console.log(`${e}`)
})

client.on('connect', () => {
  console.log('REDIS connected')
})

app.get('/', function (req, res) {
  client.lrange('nots-list', 0, -1, (err, reply) => {
    const list = reply
    res.render('producer_form', {result: noticeAble, list: list})
    noticeAble = false
  })
})

app.post('/produce', function (req, res) {
  const notification = req.body.notification
  client.lpush(['nots-list', notification], (err, reply) => {
    if(!err){
      noticeAble = true
      res.redirect('/')
    }else
      res.send(`error: ${err}`)
  })
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
