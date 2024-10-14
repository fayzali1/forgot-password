import { deleteToken, getEmail, tokens } from "@/lib/tokenStorage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    token,
    // password, //This variable is to be used when a DB is added to the project
  } = await request.json();

  console.log(tokens);

  const email = getEmail(token);

  if (!email) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  // Here you would update the user's password in your database
  // For this example, we'll just log it
  console.log(`Updating password for ${email}`);

  // Remove the used token
  deleteToken(token);

  return NextResponse.json(
    { message: "Password successfully reset" },
    { status: 200 }
  );
}
