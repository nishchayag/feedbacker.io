import { getServerSession } from "next-auth";
import connectDB from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
import authOptions from "@/lib/nextAuthOptions";
import UserModel from "@/models/user.model";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "User not logged in, please login" });
    }

    const { isAcceptingMessages } = await request.json();
    if (typeof isAcceptingMessages !== "boolean") {
      return NextResponse.json({ error: "Invalid acceptance request" });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: session.user._id },
      { isAcceptingMessages: isAcceptingMessages },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" });
    }
    console.log("User updated:", updatedUser);
    return NextResponse.json({
      message: "User message acceptance status updated successfully",
      updatedUser,
      success: true,
    });
  } catch (error: any) {
    console.error("Error in acceptMessage route:", error);
    return NextResponse.json({
      error: "Error accepting message: " + error.message,
    });
  }
}

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "User not logged in, please login" });
    }

    const user = await UserModel.findById(session.user._id).select(
      "isAcceptingMessages"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    return NextResponse.json({
      isAcceptingMessages: user.isAcceptingMessages,
      success: true,
    });
  } catch (error: any) {
    console.error("Error in acceptMessage GET route:", error);
    return NextResponse.json({
      error: "Error fetching message acceptance status: " + error.message,
    });
  }
}
