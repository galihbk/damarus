"use client";

import { useLang } from "@/context/LanguageContext";
import { dictionary } from "@/context/dictionary";
import Link from "next/link";

export default function Hero() {
  const { lang } = useLang();
  const t = dictionary[lang];

  return (
    <section
      className="
        relative
        overflow-hidden
        min-h-screen
        flex items-center md:items-start
        pt-28 md:pt-32
      "
      id="home"
    >
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-[#fff3e8]
          via-[#ffd6a5]
          to-[#ff9e57]
          -z-30
        "
      />

      <div
        className="
          absolute right-0 top-1/2
          w-[700px] h-[700px]
          bg-orange-500/30
          blur-[140px]
          rounded-full
          -z-20
        "
      />

      <div
        className="
          absolute left-1/3 top-1/3
          w-[500px] h-[500px]
          bg-yellow-300/20
          blur-[120px]
          rounded-full
          -z-20
        "
      />

      <div
        className="
          absolute right-20 top-1/2
          w-[600px] h-[600px]
          bg-orange-400/30
          blur-[120px]
          rounded-full
          -z-10
        "
      />

      <svg
        className="absolute top-0 left-0 w-full h-[420px] md:h-[900px] -z-10"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(255,243,232,0.7)"
          d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,0L0,0Z"
        />
      </svg>

      <svg
        className="absolute top-0 left-0 w-full h-[520px] md:h-[1050px] -z-10"
        viewBox="0 0 1440 250"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(255,243,232,0.45)"
          d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,0L0,0Z"
        />
      </svg>

      <div
        className="
          max-w-7xl mx-auto
          grid md:grid-cols-2
          items-center
          gap-12
          px-6
          py-12
          w-full
        "
      >
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
            {t.heroTitle1}
            <span className="block text-orange-600">{t.heroTitle2}</span>
          </h1>

          <p className="text-gray-800 mb-6 max-w-lg text-lg">{t.heroDesc}</p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/#products"
              className="
        px-7 py-3
        bg-orange-500
        text-white
        rounded-xl
        shadow-lg
        hover:scale-105
        transition
        font-semibold
      "
            >
              {lang === "en" ? "Explore Products" : "Lihat Produk"}
            </Link>

            <Link
              href="/catalog"
              className="
        px-7 py-3
        border border-gray-400
        text-gray-800
        rounded-xl
        hover:bg-white/60
        transition
        font-semibold
      "
            >
              {lang === "en" ? "View Catalog" : "Lihat Katalog"}
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center">
          <img
            src="/products/group.png"
            className="
              relative
              w-full
              max-w-[720px]
              lg:max-w-[780px]
              scale-105 md:scale-110
              drop-shadow-[0_45px_70px_rgba(0,0,0,0.25)]
              animate-float
              hover:scale-[1.15]
              transition
              duration-500
            "
          />
        </div>
      </div>
    </section>
  );
}
