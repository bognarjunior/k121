function sendMailSecret(email, name, friend) {

    var nodemailer = require('nodemailer');

    var $usuario = 'email@gmail.com';
    var $senha = 'senha';  

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: $usuario,
            pass: $senha
        }
    });

    var $destinatario = email;

    var mailOptions = {
        from: $usuario,
        to: $destinatario,
        subject: 'Seu amigo secreto foi sorteado',
        text: 'Olá ' + name + ', seu amigo secreto foi sorteado e ele é o '+ friend + '!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}

module.exports.sendMailSecret = sendMailSecret;