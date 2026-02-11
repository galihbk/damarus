"use client";

import { useLang } from "@/context/LanguageContext";
import { dictionary } from "@/context/dictionary";
import Link from "next/link";

export default function Products() {
  const { lang } = useLang();
  const t = dictionary[lang];

  const products = [
    {
      name: "Chitop Chips",
      desc: {
        en: "Crispy potato chips with authentic grilled beef flavor.",
        id: "Keripik kentang renyah dengan rasa sapi panggang autentik.",
      },
      img: "/products/chitop.png",
    },
    {
      name: "Chitop",
      desc: {
        en: "Delicious potato chips with unique seaweed umami taste.",
        id: "Keripik kentang lezat dengan rasa rumput laut gurih.",
      },
      img: "/products/chitop2.png",
    },
    {
      name: "Ikako",
      desc: {
        en: "Spicy squid-flavored snack with chewy texture.",
        id: "Camilan rasa cumi pedas dengan tekstur kenyal.",
      },
      img: "/products/ikako.png",
    },
  ];

  return (
    <section className="py-24 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {t.productsTitle}
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto">{t.productsDesc}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p, i) => (
            <div
              key={i}
              className="group bg-gradient-to-b from-white to-orange-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-6">
                <img
                  src={p.img}
                  className="w-full max-w-[220px] group-hover:scale-110 transition duration-500"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                {p.name}
              </h3>

              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {p.desc[lang]}
              </p>
            </div>
          ))}
        </div>

        <div className="py-10 text-center">
          <Link
            href="/catalog"
            className="px-10 py-4 rounded-lg bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition"
          >
            {t.catalog}
          </Link>
        </div>
      </div>
    </section>
  );
}
