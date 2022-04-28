const db = require("../utils/db");


const numberDigit = (num,digit) => {

    return num.toFixed(digit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

const dateSetDate = async (d) => {

    let date_arr = [];

    for(let i=(d-1);i>=0;i--){
       let date_tmp = new Date();
       date_tmp.setDate(date_tmp.getDate() - i);

       let  month = '' + (date_tmp.getMonth() + 1),
            day = '' + date_tmp.getDate(),
            year = date_tmp.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            date_arr.push([year, month, day].join('-'));
    }
    return date_arr;
}

const datetime_now = (param) => {
    //const datetime_now = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }).replace(/T/, ' ').replace(/\..+/, '');
    //const datetime_now = new Date().toISOString('th-TH', { timeZone: 'Asia/Bangkok' }).replace(/T/, ' ').replace(/\..+/, '');
    const current_datetime = new Date();
    const formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
    const formatted_time = current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();

    if(param =='date'){
        return formatted_date;
    }else if(param =='datetime'){
        return formatted_date+' '+formatted_time;
    }else if(param =='time'){
        return formatted_time;
    }else{
        return formatted_date+' '+formatted_time;
    }
}

module.exports = {
    numberDigit,
    dateSetDate,
    datetime_now
}