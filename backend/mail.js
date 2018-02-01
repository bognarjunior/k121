function sendMailSecret(email, name, friend) {

    var nodemailer = require('nodemailer');

    var $usuario = 'bognar.junior@gmail.com';
    var $senha = 'c0r1nth14ns';  

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: $usuario,
            pass: $senha
        }
    });

    var $destinatario = 'bognar_junior@yahoo.com.br';

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