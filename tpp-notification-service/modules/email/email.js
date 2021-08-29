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

module.exports.sendSynchAcceptionEmail = async (id, date) => {
  try {
    const emailHtml = template.GetRenderedSyncAcceptedEmailHtml({
      id,
      launchedAt: date,
      receivedAt: Date.now(),
    });

    const mailOptions = {
      from: EMAIL.FROM,
      to: EMAIL.TO,
      subject: "Local Central Bank - New Synchronization Received!",
      html: emailHtml,
    };

    // email delivery
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(`Error sending email: ${err.message}`);
  }
};
