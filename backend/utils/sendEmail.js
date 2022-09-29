const nodemailer = require('nodemailer');
const config = require('config');

module.exports = async (email, subject, name, url) => {
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
      html: `<div style='max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998'>
      <span>Action required : Activate your ContractEmployee.com account</span>
    </div>
    <div style='padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto'>
      <span>Hello ${name}</span>
      <div style='padding:20px 0'>
        <span style='padding:1.5rem 0'>
          You recently created an account on Contract Employee. To complete your
          registration, please confirm your account.
        </span>
      </div>
      <a
        href=${url}
        style='width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600'
      >
        Confirm your account
      </a>
      <div style='padding-top:20px'>
        <span style='margin:1.5rem 0;color:#898f9c'>
          Contract Employee is a platform for freelancers to get part-time job.
        </span>
      </div>
    </div>`
    });
    console.log('email sent successfully');
  } catch (error) {
    console.log('email not sent!');
    console.log(error);
    return error;
  }
};
