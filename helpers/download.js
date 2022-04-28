
require('dotenv').config();
const fs = require('fs');  
const path = require('path'); 
const axios = require('axios');
const line = require('@line/bot-sdk');

const downloadImageLine = async (id,sender) => {

  let writer_result = false;
  let current_datetime = new Date();  
  let filename = current_datetime.getFullYear()+'_'+(current_datetime.getMonth() + 1)+'_'+current_datetime.getDate()+'_'+current_datetime.getHours()+'_'+current_datetime.getMinutes()+'_'+current_datetime.getSeconds()+'_'+id+'.png';
  let localFilePath  = path.resolve(__dirname, 'images', filename);

      const client = new line.Client({
        channelAccessToken: process.env.LINE_ACCESS_TOKEN
      });

      const writer = fs.createWriteStream(localFilePath, {
        encoding: "binary"
      })
  
      client.getMessageContent(id) 
      .then((stream) => {
        stream.on('data', (chunk) => {
         
            writer_result = writer.write(chunk);
  
        });
        stream.on('error', (err) => {
            console.log('err');
        });
      });

      return filename;
}

module.exports = {
    downloadImageLine
}

