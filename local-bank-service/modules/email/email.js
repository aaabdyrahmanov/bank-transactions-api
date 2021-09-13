const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const { EMAIL } = require("../../config");
const template = require("./email.templates");

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: EMAIL.SERVICE,
    host: EMAIL.HOST,
    auth: {
      user: EMAIL.USERNAME,
      pass: EMAIL.PASSWORD,
    },
  })
);

module.exports.sendTechnicalFailureEmail = async (id, date) => {
  try {
    const emailHtml = template.GetRenderedTransactionTechnicalFailureEmailHtml({
      id,
      launchedAt: date,
      terminatedAt: Date.now(),
    });

    const mailOptions = {
      from: EMAIL.FROM,
      to: EMAIL.TO,
      subject: "Local Central Bank - Synchronization Rejection!",
      html: emailHtml,
    };

    // email delivery
    transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error(`Error sending email: ${err.message}`);
  }
};
