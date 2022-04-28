require('dotenv').config();
const request = require('request');
const test_reply = function(reply_token, text) {
    let data = {
      replyToken: reply_token,
      "messages": [
        {
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
              "type": "bubble",
              "direction": "ltr",
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "Test Reply",
                    "size": "xl",
                    "align": "center",
                    "gravity": "center",
                    "weight": "bold",
                    "color": "#F20D0D"
                  },
                  {
                    "type": "text",
                    "text": "ทดสอบระบบ CMS Services",
                    "margin": "lg",
                    "align": "center",
                    "weight": "bold",
                    "color": "#F20D0D",
                    "wrap": true
                  },
                  {
                    "type": "text",
                    "text": "fxboat.th@gmail.com",
                    "margin": "sm",
                    "size": "xl",
                    "align": "center",
                    "gravity": "center",
                    "weight": "bold",
                    "color": "#181717"
                  }
                ]
              }
            }
          }
        ]
    }
    request({
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer '+process.env.LINE_ACCESS_TOKEN
      },
      url: process.env.LINE_WEBHOOK_URL_REPLY,
      method: 'POST',
      body: data,
      json: true
    }, function (err, res, body) {
      if (err) console.log('error')
      if (res) console.log('success')
      if (body) console.log(body)
    })
}
const test_push = function(sender, text) {
  let data = {
    to: sender,
    "messages": [
      {
          "type": "flex",
          "altText": "Flex Message",
          "contents": {
            "type": "bubble",
            "direction": "ltr",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "Test Push",
                  "size": "xl",
                  "align": "center",
                  "gravity": "center",
                  "weight": "bold",
                  "color": "#F20D0D"
                },
                {
                  "type": "text",
                  "text": "ทดสอบระบบ CMS Services",
                  "margin": "lg",
                  "align": "center",
                  "weight": "bold",
                  "color": "#F20D0D",
                  "wrap": true
                },
                {
                  "type": "text",
                  "text": "fxboat.th@gmail.com",
                  "margin": "sm",
                  "size": "xl",
                  "align": "center",
                  "gravity": "center",
                  "weight": "bold",
                  "color": "#181717"
                }
              ]
            }
          }
        }
      ]
  }
  request({
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer '+process.env.LINE_ACCESS_TOKEN
    },
    url: process.env.LINE_WEBHOOK_URL_PUSH,
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}
module.exports = {
  test_reply,
  test_push
}