import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});


const sendEmail = (from, to, subject, html) => {
  transporter.sendMail(
    {
      from: from,
      to,
      subject, 
      html,
    },
    (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Verification email was sent successfully");
      }
    }
  );
};

export default sendEmail;