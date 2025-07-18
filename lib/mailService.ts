import userModel from "@/models/user.model";
import connectDB from "./connectDB";
import { Resend } from "resend";
import VerificationEmail from "@/emailTemplates/verifyEmailTemplate";
import ResetPasswordOtpEmail from "@/emailTemplates/resetPasswordTemplate";
import { NextResponse } from "next/server";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  email,
  mailType,
  otpCode,
}: {
  email: string;
  mailType: string;
  otpCode: string;
}) => {
  try {
    await connectDB();
    if (!email || !mailType) {
      console.error("Email or mailType is missing");
      return;
    }
    const userInDB = await userModel.findOne({ email });
    if (!userInDB) {
      console.error("User not found in the database");
      return;
    }

    const { data, error } = await resend.emails.send({
      from: "FeedBacker.io <feedback-io@nishchayag.live>",
      to: email,
      subject:
        mailType === "VERIFY"
          ? "Email Verification code for FeedBacker.io"
          : "Reset Password code for FeedBacker.io",
      react:
        mailType === "VERIFY"
          ? VerificationEmail({ otp: otpCode, name: userInDB.name })
          : ResetPasswordOtpEmail({ otp: otpCode, name: userInDB.name }),
    });
    if (data) {
      console.log("Email sent successfully:", data);
      return NextResponse.json({ message: "Email sent successfully" });
    }
    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ error: "Error sending email" + error });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Error sending email" + error });
  }
};
