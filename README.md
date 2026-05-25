<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/698268f4-f29a-4ccc-bab1-ade39855e1f9

## Run Locally

**Prerequisites:**  Node.js

// pages/api/send-otp.js

import nodemailer from "nodemailer";

let otpStore = {}; // temporary store

export default async function handler(req, res) {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // save otp
    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      html: `<h1>Your OTP is ${otp}</h1>`,
    });

    return res.status(200).json({
      success: true,
      message: "OTP Sent",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export { otpStore };

// pages/api/verify-otp.js

import { otpStore } from "./send-otp";

export default async function handler(req, res) {
  try {
    const { email, otp } = req.body;

    // verify
    if (otpStore[email] === otp) {

      // remove used otp
      delete otpStore[email];

      return res.status(200).json({
        success: true,
        message: "Login Successful",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
const verifyOtp = async () => {

  const response = await fetch("/api/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
  });

  const data = await response.json();

  if (data.success) {
    alert("Login Success");
  } else {
    alert("Wrong OTP");
  }
};
if (otp.length === 6) {
   login();
}