import connectDB from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user.model";
export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const { email, username, otpCode } = await request.json();
    if ((!email && !username) || !otpCode) {
      return NextResponse.json({ error: "All fields are required" });
    }
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (!existingUser) {
      return NextResponse.json({
        error: "Invalid Email/Username or OTP",
        success: false,
      });
    }
    if (existingUser.verifyCodeExpiry < new Date()) {
      await userModel.deleteOne({ $or: [{ email }, { username }] });
      return NextResponse.json({
        success: false,
        error:
          "OTP has expired, please signup again since you didn't verify your email in time, and the user credentials have been removed.",
      });
    }
    if (existingUser.verifyCode !== otpCode) {
      return NextResponse.json({ error: "Invalid OTP code", success: false });
    }
    existingUser.isVerified = true;
    existingUser.verifyCode = undefined;
    existingUser.verifyCodeExpiry = undefined;
    await existingUser.save();
    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
      user: {
        email: existingUser.email,
        username: existingUser.username,
        name: existingUser.name,
      },
    });
  } catch (error) {
    console.error("Error in email verification:", error);
    return NextResponse.json({ error: "Error while verification: " + error });
  }
}
