const nodemailer = require('nodemailer');

exports.MailSender = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  const sendEmail = (targetEmail, content) => {
    const message = {
      from: 'OpenMusic App',
      to: targetEmail,
      subject: 'Ekspor Lagu Pada Daftar Putar',
      text: 'Terlampir hasil dari ekspor lagu pada daftar putar',
      attachments: [
        {
          filename: 'openmusic.json',
          content,
        },
      ],
    };

    return transporter.sendMail(message)
  }

  return {
    sendEmail
  }
}
