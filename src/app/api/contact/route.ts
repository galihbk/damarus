import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message, token } = await req.json();

    // ===============================
    // BASIC VALIDATION
    // ===============================
    if (!name || !email || !message || !token) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 },
      );
    }

    console.log("TOKEN LENGTH:", token.length);
    console.log("SECRET LOADED:", !!process.env.TURNSTILE_SECRET_KEY);

    // ===============================
    // VERIFY TURNSTILE (STABLE VERSION)
    // ===============================
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
        }),
      },
    );

    const verifyData = await verifyRes.json();

    console.log("TURNSTILE DEBUG >>>", verifyData);

    if (!verifyData.success) {
      return NextResponse.json(
        { ok: false, error: "Captcha failed" },
        { status: 403 },
      );
    }

    // ===============================
    // MAIL TRANSPORTER
    // ===============================
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // ===============================
    // SEND EMAIL
    // ===============================
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
    console.error("CONTACT ERROR >>>", err);

    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
