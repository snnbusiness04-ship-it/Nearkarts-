<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/698268f4-f29a-4ccc-bab1-ade39855e1f9

## Run Locally

**Prerequisites:**  Node.js



1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
npm install nodemailer
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_16_digit_google_app_password
/pages/api/send-otp.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { email } = req.body;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Gmail Transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send Mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial">
          <h2>OTP Verification</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      otp,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
const sendOtp = async () => {
  const response = await fetch("/api/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  const data = await response.json();

  console.log(data);

  if (data.success) {
    alert("OTP Sent");
  } else {
    alert("OTP Failed");
  }
};
git add .
git commit -m "fixed otp"
git push