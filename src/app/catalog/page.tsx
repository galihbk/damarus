"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/context/LanguageContext";
import { dictionary } from "@/context/dictionary";
import Image from "next/image";

const catalogItems = [
  {
    title: "Chitop Chips",
    image: "/products/chitop.png",
    desc: {
      en: "Crispy potato chips with authentic grilled beef flavor.",
      id: "Keripik kentang renyah dengan rasa sapi panggang autentik.",
    },
  },
  {
    title: "Chitop",
    image: "/products/chitop2.png",
    desc: {
      en: "Delicious potato chips with unique seaweed umami taste.",
      id: "Keripik kentang lezat dengan rasa rumput laut gurih.",
    },
  },
  {
    title: "Ikako",
    image: "/products/ikako.png",
    desc: {
      en: "Spicy squid-flavored snack with chewy texture.",
      id: "Camilan rasa cumi pedas dengan tekstur kenyal.",
    },
  },
  {
    title: "Minari",
    image: "/products/minari.png",
    desc: {
      en: "Crunchy dry noodle snack with savory seasoning.",
      id: "Camilan mie kering renyah dengan bumbu gurih.",
    },
  },
  {
    title: "Robustar",
    image: "/products/robustar.png",
    desc: {
      en: "Crispy macaroni snack with smoky BBQ flavor.",
      id: "Snack makaroni renyah dengan rasa BBQ asap.",
    },
  },
];

export default function CatalogPage() {
  const { lang } = useLang();
  const t = dictionary[lang];

  return (
    <>
      <Header />

      <main className="pt-28 min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {lang === "en" ? "Product Catalog" : "Katalog Produk"}
          </h1>

          <p className="text-gray-600 mb-12 max-w-xl">
            {lang === "en"
              ? "Browse our complete catalog of snack products."
              : "Jelajahi katalog lengkap produk camilan kami."}
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {catalogItems.map((item, i) => (
              <div
                key={i}
                className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  hover:shadow-xl
                  transition
                  overflow-hidden
                  group
                "
              >
                <div className="relative h-48 bg-gray-50 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc[lang]}
                  </p>
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
