import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import { setToken } from "@/lib/tokenStorage";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email } = await request.json();
  const token = crypto.randomBytes(20).toString("hex");

  setToken(token, email);

  // Create reset link
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Reset",
      html: `
        <p>Click this link to reset your password:</p>
        <a href="${resetLink}">Click here</a>
      `,
    });

    if (error) {
      return NextResponse.json(error, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}
