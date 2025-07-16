import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/user.model";
export async function GET({
  params,
}: {
  params: { username: string; email: string };
}) {
  await connectDB();
  try {
    const { username, email } = params;

    const user = await UserModel.findOne({
      $or: [{ username }, { email }],
    }).select("isAcceptingMessages");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      isAcceptingMessages: user.isAcceptingMessages,
      success: true,
    });
  } catch (error: any) {
    console.error("Error fetching user acceptance status:", error);
    return NextResponse.json(
      {
        error: "Error fetching acceptance status: " + error.message,
      },
      { status: 500 }
    );
  }
}
