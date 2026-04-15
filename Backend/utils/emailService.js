import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOtpEmail = async (toEmail, otp) => {
  try {
    const mailOptions = {
      from: `"Alumni Events Technical Team" <${process.env.SMTP_USER}>`,
      replyTo: "arctiet@thapar.edu",
      to: toEmail,
      subject: "Event Controller Password Reset OTP - Alumnievents.thapar.edu",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #2F80ED; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Password Reset</h1>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #333;">Hello,</p>
            <p style="font-size: 16px; color: #333;">We received a request to reset your Controller Login password. Please use the following One-Time Password (OTP) to proceed:</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2F80ED; background-color: #f4f7fb; padding: 15px 30px; border-radius: 8px;">
                ${otp}
              </span>
            </div>
            <p style="font-size: 14px; color: #666; text-align: center;">
              This code will expire in <strong>5 minutes</strong>. If you did not request a password reset, you can safely ignore this email.
            </p>
          </div>
          <div style="background-color: #f9f9f9; padding: 15px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="font-size: 12px; color: #999; margin: 0;">
              &copy; ${new Date().getFullYear()} Alumnievents.thapar.edu. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};

export const sendAdminOtpEmail = async (toEmail, otp) => {
  try {
    const mailOptions = {
      from: `"ARC Alumni Events Admin" <${process.env.SMTP_USER}>`,
      replyTo: "arctiet@thapar.edu",
      bcc: "garvnoor111@gmail.com",
      to: toEmail,
      subject: "URGENT: Admin Privileges Recovery - Alumnievents.thapar.edu",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #ffffff; border-top: 5px solid #CA0002; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-radius: 0 0 8px 8px; overflow: hidden;">
            <div style="padding: 40px 30px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #1a1a1a; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">Security Alert</h2>
                <p style="color: #CA0002; font-weight: 600; margin-top: 5px;">Admin Gateway Recovery</p>
              </div>

              <div style="background-color: #fafafa; border-left: 4px solid #CA0002; padding: 15px 20px; margin-bottom: 25px;">
                <p style="margin: 0; color: #444; font-size: 15px; line-height: 1.6;">
                  An authentication recovery request was initiated for your ARC Administrative privileges.
                  To verify your identity and authorize this password reset, please use the secure code below.
                </p>
              </div>

              <div style="text-align: center; margin: 35px 0;">
                <p style="font-size: 12px; text-transform: uppercase; color: #888; letter-spacing: 2px; margin-bottom: 10px;">Your Authorization Code</p>
                <div style="display: inline-block; border: 2px dashed #CA0002; padding: 15px 40px; background-color: #fff0f0;">
                  <span style="font-size: 38px; font-weight: 800; letter-spacing: 8px; color: #CA0002; font-family: monospace;">
                    ${otp}
                  </span>
                </div>
              </div>

              <div style="border-top: 1px solid #eee; padding-top: 25px; margin-top: 30px;">
                <p style="font-size: 13px; color: #666; margin-bottom: 5px;">
                  <strong style="color: #CA0002;">Critical:</strong> This code is strictly confidential and valid for <span style="font-weight:bold; color:#1a1a1a;">5 minutes</span>.
                </p>
                <p style="font-size: 13px; color: #666; margin-top: 0;">
                  If this action was unauthorized, please contact the system administrators immediately to secure your account.
                </p>
              </div>
            </div>

            <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
              <p style="font-size: 11px; color: #888; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
                ARC Alumni Events System • Authorized Personnel Only
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Admin OTP Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending Admin OTP email:", error);
    return false;
  }
};
