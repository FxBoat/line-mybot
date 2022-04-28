const db = require("../utils/db");

const Message = () => {

}
Message.create = async (newMessage) => {

    let insert = await db.query("INSERT INTO messages SET ?", newMessage);
    if( insert.insertId){
        return insert.insertId;
    }
    else{
        return;
    }
}
module.exports = Message;