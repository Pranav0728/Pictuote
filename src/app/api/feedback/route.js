import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Create a reusable transporter object using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_EMAIL_ID,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
  },
});

// Function to send the email
export async function POST(req) {
  try {
    const data = await req.json();
    const { name, feedback, email, rating } = data;

    // Send the email using the transporter object
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`, // sender address format: "Name <email>"
      to: "pranavmolawade123@gmail.com", // recipient
      subject: "New Feedback from Pictuote", // Subject line
      text: `Name: ${name}\nEmail: ${email}\nFeedback: ${feedback}\nRating: ${rating}`, // plain text body
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Feedback:</strong> ${feedback}</p>
        <p><strong>Rating:</strong> ${rating}/5</p>
      `, // HTML body with rating included
    });

    // Return the success response with the messageId
    return NextResponse.json({
      message: "Message sent successfully",
      messageId: info.messageId,
    }, {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    
    // Return the error response
    return NextResponse.json({
      message: "Error sending email, check server logs",
    }, {
      status: 500,
    });
  }
}
