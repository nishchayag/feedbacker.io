import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/nextAuthOptions";
import UserModel from "@/models/user.model";
import "@/models/message.model";
export async function GET() {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({
        success: false,
        error: "User not logged in, please login",
      });
    }

    const user = await UserModel.findById(session.user._id)
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 } },
      })
      .select("messages");

    if (!user || !user.messages) {
      return NextResponse.json({
        success: false,
        error: "No messages found for this user",
      });
    }

    return NextResponse.json({
      success: true,
      messages: user.messages,
    });
  } catch (error: unknown) {
    console.error("Error in getMessages route:", error);
    return NextResponse.json({
      success: false,
      error: "Error fetching messages: " + (error as Error).message,
    });
  }
}
