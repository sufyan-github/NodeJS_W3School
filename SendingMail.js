const { text } = require('express');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'2003085@student.ruet.ac.bd',
        pass:'SuFyan2003085'
    }
});

var mainOptions = {
    from:'2003085@student.ruet.ac.bd',
    to:'abusufyan.cse20@gmail.com',
    subject:"Test Mail",
    text:"This is test mail"
}

transporter.sendMail(mainOptions,function(error,info){
    if(error){
        console.log("mail didn't send " + error);
    }
    else{
        console.log('Mail send successfuly');
    }
});

