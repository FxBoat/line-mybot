
require('dotenv').config();
const messages = require('../utils/messages');
const download = require('../helpers/download');

const helper = require("../helpers/helper");
const Message = require("../models/Message");

const webhook = async (req,res) => {

    if(req.body.events){

      let type = req.body.events[0].message.type;
      let sender = req.body.events[0].source.userId;
      let replyToken = req.body.events[0].replyToken;
      console.log(req.body.events[0].message);

        if(type == 'text' && req.body.events[0].message.text){

          let text = req.body.events[0].message.text;
          console.log(text, sender, replyToken);
          console.log(typeof sender, typeof text);

          if(text === 'test reply' || text === 'Test Reply' || text === 'Test reply'){
            messages.test_reply(replyToken, text);
          } 
          if(text === 'test push' || text === 'Test Push' || text === 'Test push'){
            messages.test_push(sender, text);
          } 

        }
        else if(type == 'image'){

          let id = req.body.events[0].message.id;

          let file_name = await download.downloadImageLine(id,sender);
          console.log(file_name);
          const message_id = await Message.create({
              sender : sender,
              type : 2,
              type_text : 'image',
              text_message : '',
              file_name : file_name,
              // add_date: helper.datetime_now('date'),
              // add_time: helper.datetime_now('time'), 
              created_at: helper.datetime_now('datetime'),
              updated_at: helper.datetime_now('datetime')
          });

          // let downloaded = await download.downloadImageLine(id,sender);
          // console.log(downloaded);
        }
        else if(type == 'sticker'){

        }
        else{

        }

    }//End if req.body.events[0]
  
    res.status(200).json({
      status: 'succes'
    });

}
module.exports = {
    webhook
}