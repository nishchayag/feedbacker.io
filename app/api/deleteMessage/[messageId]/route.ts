import { NextRequest, NextResponse } from "next/server";

import { AppRouteRouteHandlerContext } from "next/dist/server/route-modules/app-route/module";

import connectDB from "@/lib/connectDB";
import authOptions from "@/lib/nextAuthOptions";
import UserModel from "@/models/user.model";
import messageModel from "@/models/message.model";
import { getServerSession } from "next-auth";

export async function DELETE(
  _req: NextRequest,
  context: AppRouteRouteHandlerContext
) {
  await connectDB();

  const messageId = await context.params!.messageId;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { message: "Unauthorized", success: false },
      { status: 401 }
    );
  }

  const user: User = session.user as User;

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $pull: {
          messages: { _id: messageId },
        },
      },
      { new: true }
    );

    await messageModel.findByIdAndDelete(messageId);

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Message not found or already deleted", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Message deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { message: "Failed to delete message", success: false },
      { status: 500 }
    );
  }
}
