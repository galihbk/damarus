"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/context/LanguageContext";
import { dictionary } from "@/context/dictionary";

export default function Contact() {
  const { lang } = useLang();
  const t = dictionary[lang];

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!token) return;

    setLoading(true);

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
      token,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("success");
      e.target.reset();
    } else {
      setStatus("error");
    }

    setToken("");

    if ((window as any).turnstile) {
      (window as any).turnstile.reset("#turnstile-widget");
    }

    setLoading(false);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if ((window as any).turnstile) {
        clearInterval(interval);

        (window as any).turnstile.render("#turnstile-widget", {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(""),
        });
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

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

          <div id="turnstile-widget" />

          <button
            type="submit"
            disabled={loading || !token}
            className={`w-full py-3 font-semibold rounded-xl transition flex items-center justify-center gap-2
            ${
              loading || !token
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
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
