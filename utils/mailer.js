const path = require("path");

const nodemailer = require("nodemailer");
const ejs = require("ejs");

const { config } = require("../configs/appConfig.js");

const transporter = nodemailer.createTransport({
  host: config.nodemailer.host,
  port: config.nodemailer.port,
  secure: config.nodemailer.secure,
  auth: {
    user: config.nodemailer.auth.user,
    pass: config.nodemailer.auth.pass,
  },
});

const sendMail = async (to, subject, template, data = {}, attachments = []) => {
  try {
    const html = await ejs.renderFile(
      path.join(process.cwd(), "views", "emails", `${template}.ejs`),
      data,
    );

    const mailOptions = {
      from: config.nodemailer.auth.user,
      to,
      subject,
      html,
      attachments,
    };

    try {
      const info = transporter.sendMail(mailOptions);
      console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
      console.error(error);
      return error;
    }

    return info;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = { sendMail };
