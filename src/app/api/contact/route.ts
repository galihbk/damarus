import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ipLogs = new Map<string, number[]>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    const { name, email, message, company, started } = await req.json();

    if (company) {
      return NextResponse.json({ ok: true });
    }

    if (Date.now() - Number(started) < 2000) {
      return NextResponse.json({ ok: true });
    }

    const now = Date.now();
    const logs = ipLogs.get(ip) || [];
    const recent = logs.filter((t) => now - t < 60000);

    if (recent.length >= 3) {
      return NextResponse.json(
        { ok: false, error: "Rate limited" },
        { status: 429 },
      );
    }

    recent.push(now);
    ipLogs.set(ip, recent);

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 },
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
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
