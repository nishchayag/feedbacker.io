import connectDB from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { usernameValidation } from "@/schemas/signUpSchema";
import UserModel from "@/models/user.model";

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);

    const usernameParam = searchParams.get("username");
    // Check if username parameter exists
    if (!usernameParam) {
      return NextResponse.json(
        { error: "Username parameter is required" },
        { status: 400 }
      );
    }
    if (usernameParam.length < 4) {
      return NextResponse.json(
        { error: "Username must be at least 4 characters long" },
        { status: 400 }
      );
    }
    // Validate with zod
    const result = usernameValidation.safeParse(usernameParam);
    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error.issues.map((issue) => issue.message).join(", "),
        },
        { status: 400 }
      );
    }

    const username = result.data;

    // Check if username already exists in database
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "Username is already taken",
      });
    }

    // Username is available
    return NextResponse.json({
      success: true,
      message: "Username is available",
    });
  } catch (error) {
    console.error("Error checking uniqueness of username:", error);
    return NextResponse.json(
      { error: "Error checking username uniqueness" },
      { status: 500 }
    );
  }
}
