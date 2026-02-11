"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { dictionary } from "@/context/dictionary";

export default function Contact() {
  const { lang } = useLang();
  const t = dictionary[lang];

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
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

          <div className="space-y-4 text-gray-800">
            <div>
              <div className="font-semibold">Email</div>
              <div>info@damarusfood.com</div>
            </div>

            <div>
              <div className="font-semibold">Phone</div>
              <div>+62 812 0000 0000</div>
            </div>

            <div>
              <div className="font-semibold">{t.location}</div>
              <div>Indonesia</div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
        >
          <input
            name="name"
            placeholder={t.name}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-400"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-400"
            required
          />

          <textarea
            name="message"
            rows={4}
            placeholder={t.message}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-400"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-xl transition flex items-center justify-center gap-2
            ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Sending..." : t.send}
          </button>

          {/* STATUS MESSAGE */}
          {status === "success" && (
            <div className="text-green-600 font-medium">
              ✅ Message sent successfully!
            </div>
          )}

          {status === "error" && (
            <div className="text-red-600 font-medium">
              ❌ Failed sending message. Please try again.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
