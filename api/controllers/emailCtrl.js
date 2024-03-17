import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';
import  {Resend}  from 'resend'


export const sendEmail = asyncHandler( async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    secure: true,
    port: 465,
    auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY
    }
})

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Hey 👻" <onboarding@resend.dev>', // sender address
    to: "mtonor1368@gmail.com", // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.htm, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})

