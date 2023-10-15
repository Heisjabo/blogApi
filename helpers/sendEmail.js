import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "jabojeanmarie5@gmail.com",
    pass: "seey nvkx ojdz zkbg"
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