const express = require('express');
const app = express();
const redis = require('redis'); 
const client = redis.createClient();
const bodyParser = require("body-parser")
const port = 3000;

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true})); 

var msg = null

client.on('error', (e) => {
  console.log(`${e}`)
})

client.on('connect', () => {
  console.log('REDIS connected')
})

app.get('/', function(req, res) {
  res.render('consumer_view', {notification: msg})
  msg = null
})

app.get('/consume', function (req, res) {
  client.brpop('nots-list', 0, (err, reply) => {
    if(err) res.send(reply)
    else{
      msg = reply[1]
      res.redirect('/')
    }
  })
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
