"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/context/LanguageContext";
import { dictionary } from "@/context/dictionary";

export default function PrivacyPage() {
  const { lang } = useLang();
  const t = dictionary[lang];

  return (
    <>
      <Header />

      <section className="pt-32 pb-24 min-h-screen bg-gradient-to-br from-white via-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
            {t.privacyTitle}
          </h1>

          <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 space-y-6 border">
            <p className="text-gray-700 leading-relaxed">{t.privacy1}</p>

            <p className="text-gray-700 leading-relaxed">{t.privacy2}</p>

            <p className="text-gray-700 leading-relaxed">{t.privacy3}</p>

            <p className="text-gray-700 leading-relaxed">{t.privacy4}</p>

            <p className="text-gray-700 leading-relaxed">{t.privacy5}</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
