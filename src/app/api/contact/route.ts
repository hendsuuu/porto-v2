import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function sanitizeInput(text: string): string {
  return String(text || "")
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON" },
        { status: 400 },
      );
    }

    const subjectRaw = body.subject;
    const messageRaw = body.message;
    const userEmailRaw = body.userEmail;

    if (!subjectRaw || !messageRaw || !userEmailRaw) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 },
      );
    }

    const userEmail = sanitizeInput(userEmailRaw);
    if (!isValidEmail(userEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    const subject = sanitizeInput(subjectRaw).slice(0, 120);
    const message = sanitizeInput(messageRaw).slice(0, 5000);

    // ENV check
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (!EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json(
        {
          success: false,
          error: "Server misconfigured (EMAIL_USER/EMAIL_PASS)",
        },
        { status: 500 },
      );
    }

    // ✅ SMTP config (lebih stabil dibanding "service: gmail")
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS, // Gmail App Password
      },
    });

    await transporter.verify(); // optional tapi membantu debug

    await transporter.sendMail({
      from: `"Portfolio Contact" <${EMAIL_USER}>`,
      to: EMAIL_USER, // kirim ke email kamu sendiri
      replyTo: userEmail,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${userEmail}\n\n${message}\n`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
