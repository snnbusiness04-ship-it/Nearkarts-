const otpStore = {};

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    };

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

import { otpStore } from "./send-otp";

export default async function handler(req, res) {
  try {
    const { email, otp } = req.body;

    if (
      otpStore[email] &&
      otpStore[email].otp === otp &&
      otpStore[email].expires > Date.now()
    ) {
      delete otpStore[email];

      return res.status(200).json({
        success: true,
        message: "Login Successful",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid or Expired OTP",
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
  verifyOtp();
}

EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_app_password
