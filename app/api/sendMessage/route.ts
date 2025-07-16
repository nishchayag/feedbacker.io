import messageModel from "@/models/message.model";
import { NextResponse, NextRequest } from "next/server";
import UserModel from "@/models/user.model";
import connectDB from "@/lib/connectDB";
export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const { username, email, content } = await request.json();
    if ((!username && !email) || !content) {
      return NextResponse.json({ error: "Username and content are required" });
    }
    const user = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    if (!user.isAcceptingMessages) {
      return NextResponse.json({ error: "User is not accepting messages" });
    }

    const newMessage = await messageModel.create({
      content,
      createdAt: new Date(),
      createdFor: user._id,
    });

    user.messages.push(newMessage._id);
    await user.save();
    return NextResponse.json({
      message: "Message sent successfully",
    });
  } catch (error: any) {
    console.error("Error in sendMessage route:", error);
    return NextResponse.json({
      error: "Error sending message: " + error.message,
    });
  }
}
