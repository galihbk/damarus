import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message, token } = await req.json();

  // ✅ Basic validation
  if (!name || !email || !message || !token) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // ✅ Verify Turnstile
  const verify = await fetch(
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

  const verifyData = await verify.json();
  console.log("TURNSTILE DEBUG >>>", verifyData);
  if (!verifyData.success) {
    return NextResponse.json(
      { ok: false, error: "Captcha failed" },
      { status: 403 },
    );
  }

  // ✅ Mail transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });

  try {
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
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
