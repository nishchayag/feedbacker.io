import connectDB from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import authOptions from "@/lib/nextAuthOptions";
import UserModel from "@/models/user.model";
export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "User not logged in, please login" });
    }

    const userId = new mongoose.Types.ObjectId(session.user._id as string);

    const userInDB = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!userInDB || userInDB.length === 0) {
      return NextResponse.json({ error: "No messages found for this user" });
    }

    return NextResponse.json({
      messages: userInDB[0].messages,
      success: true,
    });
  } catch (error) {
    console.error("Error in getMessages route:", error);
    return NextResponse.json({ error: "Error fetching messages: " + error });
  }
}
