"use client";

import { Turnstile } from "nextjs-turnstile";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { dictionary } from "@/context/dictionary";

export default function Contact() {
  const { lang } = useLang();
  const t = dictionary[lang];

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) return;

    setLoading(true);

    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      token,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("success");
      form.reset();
      setToken(null);
    } else {
      setStatus("error");
    }

    setLoading(false);
  }

  return (
    <section className="py-24 bg-orange-50" id="contact">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            {t.contactTitle}
          </h2>
          <p className="text-gray-700 mb-8 text-lg">{t.contactDesc}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
        >
          <input
            name="name"
            placeholder={t.name}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
            required
          />

          <textarea
            name="message"
            rows={4}
            placeholder={t.message}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
            required
          />

          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(t) => setToken(t)}
            onExpire={() => setToken(null)}
            onError={() => setToken(null)}
          />

          <button
            type="submit"
            disabled={loading || !token}
            className={`w-full py-3 font-semibold rounded-xl transition
              ${
                loading || !token
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
          >
            {loading ? "Sending..." : t.send}
          </button>

          {status === "success" && (
            <div className="text-green-600 font-medium">
              ✅ Message sent successfully!
            </div>
          )}

          {status === "error" && (
            <div className="text-red-600 font-medium">
              ❌ Please complete captcha or try again.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
