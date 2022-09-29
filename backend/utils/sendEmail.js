const nodemailer = require('nodemailer');
const config = require('config');

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.get('host'),
      service: config.get('service'),
      port: config.get('emailPort'),
      secure: config.get('secure'),
      auth: {
        user: config.get('user'),
        pass: config.get('password')
      }
    });

    await transporter.sendMail({
      from: config.get('user'),
      to: email,
      subject: subject,
      text: text
    });
    console.log('email sent successfully');
  } catch (error) {
    console.log('email not sent!');
    console.log(error);
    return error;
  }
};
