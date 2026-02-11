"use client";

import { useLang } from "@/context/LanguageContext";
import { dictionary } from "@/context/dictionary";

export default function About() {
  const { lang } = useLang();
  const t = dictionary[lang];

  return (
    <section className="relative py-24 bg-white overflow-hidden" id="about">
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-orange-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-100 rounded-full blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            {t.aboutTitle}
          </h2>

          <p className="text-gray-700 text-lg mb-6">{t.aboutP1}</p>
          <p className="text-gray-700 text-lg mb-10">{t.aboutP2}</p>

          <div className="grid grid-cols-2 gap-6">
            <Stat value="10+" label={t.stats1} />
            <Stat value="5+" label={t.stats2} />
            <Stat value="100%" label={t.stats3} />
            <Stat value="2024" label={t.stats4} />
          </div>
        </div>

        <div className="relative flex justify-center">
          <img
            src="/logo-damarus.png"
            className="w-full max-w-[520px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)] hover:scale-105 transition"
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-orange-500">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}
