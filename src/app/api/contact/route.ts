import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, message, token } = await req.json();

    if (!name || !email || !message || !token) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 },
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "";

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: token,
          remoteip: ip,
        }),
      },
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { ok: false, error: "Captcha failed" },
        { status: 403 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Website Form" <${process.env.MAIL_USERNAME}>`,
      to: process.env.MAIL_TO,
      subject: `Message from ${name}`,
      replyTo: email,
      html: `
        <h2>Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
