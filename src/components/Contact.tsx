"use client";

import { useLang } from "@/context/LanguageContext";
import { dictionary } from "@/context/dictionary";

export default function Contact() {
  const { lang } = useLang();
  const t = dictionary[lang];

  async function handleSubmit(e: any) {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Message sent!");
      e.target.reset();
    } else {
      alert("Failed sending message");
    }
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

        {/* ✅ FIXED FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
        >
          <input
            name="name"
            placeholder={t.name}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

          <textarea
            name="message"
            rows={4}
            placeholder={t.message}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition"
          >
            {t.send}
          </button>
        </form>
      </div>
    </section>
  );
}
