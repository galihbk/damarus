"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/context/LanguageContext";
import { dictionary } from "@/context/dictionary";

export default function TermsPage() {
  const { lang } = useLang();
  const t = dictionary[lang];

  return (
    <>
      <Header />

      <main className="pt-28 bg-gradient-to-b from-orange-50 via-white to-white min-h-screen">
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {t.termsTitle}
            </h1>

            <p className="text-gray-600 max-w-xl mx-auto">
              {lang === "en"
                ? "Please read these terms carefully before using our website or engaging with our services."
                : "Harap membaca syarat berikut sebelum menggunakan website atau menjalin kerja sama dengan kami."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.terms.map((line, i) => (
              <div
                key={i}
                className="
                  bg-white
                  border
                  rounded-2xl
                  p-7
                  shadow-md
                  hover:shadow-xl
                  transition
                "
              >
                <div className="text-3xl font-bold text-orange-500 mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <p className="text-gray-700 leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
