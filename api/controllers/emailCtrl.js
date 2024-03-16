import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';
import  {Resend}  from 'resend'


export const sendEmail = asyncHandler( async (data, req, res) => {
  const resend = new Resend(process.env.RESEND_API_KEY)
    const { data: response, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to:  ["mtonor1368@gmail.com"],
      subject: data.subject,
      html: data.htm,
    });
  
    if (error) { 
      throw new Error(error.message);
    } 
   
    res.status(200).json({ response });
})

