
require('dotenv').config();
const fs = require('fs');  
const path = require('path'); 
const axios = require('axios');
const line = require('@line/bot-sdk');

const db = require("../utils/db");
const helper = require("../helpers/helper");

const downloadImageLine = async (id,sender) => {

  //let lineurl = 'https://api.line.me/v2/bot/message/'+id+'/content';

      let downloaded = 0;

      const client = new line.Client({
        channelAccessToken: process.env.LINE_ACCESS_TOKEN
      });

      let current_datetime = new Date();  
      let filename = current_datetime.getFullYear()+'_'+(current_datetime.getMonth() + 1)+'_'+current_datetime.getDate()+'_'+current_datetime.getHours()+'_'+current_datetime.getMinutes()+'_'+current_datetime.getSeconds()+'_'+id+'.png';
      let localFilePath  = path.resolve(__dirname, 'images', filename);

      const writer = fs.createWriteStream(localFilePath, {
        encoding: "binary"
      })

      client.getMessageContent(id) 
      .then((stream) => {
        stream.on('data', (chunk) => {
          
            //let data_image = 'data:image/jpeg;base64,'+ chunk.toString('base64');
           
            //  fs.writeFile(localFilePath, chunk ,'binary',function(err) {
            //   if (err) { throw err; }
            //   else{
            //     console.log('Successfully downloaded file!');
            //   }
            // });
            // fs.readFile('test5.jpg', function(err, data) {
            //   if (err) throw err // Fail if the file can't be read.
            //   console.log(data);
            // })

         
            writer_result = writer.write(chunk);

            // if(writer_result){
            // }//writer_result == true

        });
        stream.on('error', (err) => {
            console.log('err');
        });
      });

      db.query("INSERT INTO messages SET ?",
              {          
                // 'uid' : sender, 
                // 'message' : '',
                // 'mtype' : 
                // 'user', 
                // 'line_type' : 'image', 
                // 'line_id' : id, 
                // 'line_filename' : filename, 
                // 'mdate' : formatted_date,
                // 'mtime' :  formatted_time}, 

                'sender' : sender, 
                'type' : 2,
                'type_text' : 'image',
                'text_message' : '', 
                'file_name' : filename, 
                'created_at' : helper.datetime_now('datetime'),
                'updated_at' : helper.datetime_now('datetime'),
                
              },function(err, res){
                                      
                  if (err) {
                  console.log("error: ", err);
            
                  }else{//Success
                    downloaded = 1;
                  }
        });

        // try {
        //     const response = await axios({
        //       url: lineurl,
        //       //url: 'https://www.kindacode.com/wp-content/uploads/2021/01/test.jpg',
        //       method: 'GET',
        //       headers: {
        //           //'Content-Type': 'application/json; charset=utf-8',
        //           'Authorization': 'Bearer '+process.env.LINE_ACCESS_TOKEN
        //       },
        //       responseType: 'stream',
        //     });

        //     // const w = response.data.pipe(fs.createWriteStream(localFilePath));
        //     // w.on('finish', () => {
        //     //   console.log('Successfully downloaded file!');
        //     // });
        //   } catch (err) { 
        //     throw new Error(err);
        //   }
      
        return downloaded;

}

module.exports = {
    downloadImageLine
}

