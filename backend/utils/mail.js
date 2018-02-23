const sendMailSecret = (email, name, friend) => {

    const nodemailer = require('nodemailer');

    let $usuario = 'bognar.junior@gmail.com';
    let $senha = 'devil4fun';  

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: $usuario,
            pass: $senha
        }
    });

    let $destinatario = 'bognar_junior@yahoo.com.br'//email;

    let mailOptions = {
        from: $usuario,
        to: $destinatario,
        subject: 'Seu amigo secreto foi sorteado',
        text: 'Olá ' + name + ', seu amigo secreto foi sorteado e ele é o '+ friend + '!'
    };

    transporter.sendMail(mailOptions, (error, info) => console.log((error) ? (error) : ('Email enviado: ' + info.response)));
}

module.exports.sendMailSecret = sendMailSecret;