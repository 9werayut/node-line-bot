var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log("text: ", text, "sender: ", sender, "replyToken: ", replyToken)
  console.log(typeof sender, typeof text)
  console.log("req.body.events[0]: ", req.body.events[0])
  console.log("req.body: ", req.body);
  if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
    sendText(sender, text);
  }
  if(text === 'สภาพอากาศ') {
    getWeather(sender);
  }
  res.sendStatus(200);
})

function getWeather (sender) {
  let data = {
    to: sender,
    messages: [
      {
        "type": "template",
        "altText": "this is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
            "title": "Menu",
            "text": "Please select",
            "actions": [
                {
                  "type": "postback",
                  "label": "Buy",
                  "data": "action=buy&itemid=123"
                },
                {
                  "type": "postback",
                  "label": "Add to cart",
                  "data": "action=add&itemid=123"
                },
                {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "http://example.com/page/123"
                }
            ]
        }
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer G+HFk/HAQbXgJEmWSl1xzj89ii0y8lKusJD2ZiU1Y2mTKSg3s9zFs8PybOFb0tzHO2EGjavJWT/oYHwbgQ2rl/k8caRgJexhXnLu0d8//4wZ5ZRLzU7pNcKNNoCPlm2F+TIYuBuvhQjJqgLCsnpWjQdB04t89/1O/w1cDnyilFU='
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}

function sendText (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'สวัสดีครับ มีอะไรให้ผมรับใช้ครับท่าน 💞'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer G+HFk/HAQbXgJEmWSl1xzj89ii0y8lKusJD2ZiU1Y2mTKSg3s9zFs8PybOFb0tzHO2EGjavJWT/oYHwbgQ2rl/k8caRgJexhXnLu0d8//4wZ5ZRLzU7pNcKNNoCPlm2F+TIYuBuvhQjJqgLCsnpWjQdB04t89/1O/w1cDnyilFU='
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
