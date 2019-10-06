const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');

module.exports = async ({ subject, recipients }, content) => {
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  sgMail.setApiKey(keys.sendGridKey);
  const formattedRecipients = recipients.map(({email}) => email);
  const msg = {
    to: formattedRecipients,
    from: 'no-reply@emaily.com',
    subject: subject,
    html: content,
  };
  await sgMail.send(msg);
}

