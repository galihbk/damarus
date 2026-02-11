"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { dictionary } from "@/context/dictionary";

export default function FAQPage() {
  const { lang } = useLang();
  const t = dictionary[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <>
      <Header />

      <main className="pt-28 bg-gradient-to-b from-orange-50 to-white min-h-screen">
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900">
            {t.faqTitle}
          </h1>

          <div className="space-y-5">
            {t.faq.map((item, i) => (
              <div
                key={i}
                className="
                  bg-white
                  border
                  rounded-2xl
                  shadow-md
                  overflow-hidden
                  transition
                "
              >
                <button
                  onClick={() => toggle(i)}
                  className="
                    w-full
                    flex justify-between items-center
                    px-6 py-5
                    text-left
                    font-semibold
                    text-gray-900
                    hover:bg-orange-50
                    transition
                  "
                >
                  {item.q}

                  <span className="text-2xl text-orange-500 font-bold">
                    {openIndex === i ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`
                    px-6 text-gray-600 leading-relaxed
                    transition-all duration-300
                    ${
                      openIndex === i
                        ? "max-h-40 py-4"
                        : "max-h-0 overflow-hidden"
                    }
                  `}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
