"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { lang, setLang } = useLang();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const pathname = usePathname();

  const t = {
    en: {
      home: "Home",
      products: "Products",
      about: "About",
      contact: "Contact",
      catalog: "View Catalog",
    },
    id: {
      home: "Beranda",
      products: "Produk",
      about: "Tentang",
      contact: "Kontak",
      catalog: "Lihat Katalog",
    },
  }[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const sections = ["home", "products", "about", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const linkClass = (id: string) => {
    if (pathname !== "/") return "hover:text-orange-600 transition";

    return `transition ${
      active === id
        ? "text-orange-600 border-b-2 border-orange-600 pb-1"
        : "hover:text-orange-600"
    }`;
  };

  const mobileLinkClass = (id: string) => `
    ${active === id ? "text-orange-600 font-bold" : "text-gray-900"}
  `;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-md"
          : "bg-white/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4">
        <div className="flex items-center gap-3">
          <Image src="/logo-damarus.png" alt="logo" width={38} height={38} />
          <div className="font-bold text-xl text-orange-600 tracking-wide">
            DAMARUS FOOD
          </div>
        </div>

        <nav className="hidden md:flex gap-8 text-gray-900 font-semibold">
          <Link href="/#home" className={linkClass("home")}>
            {t.home}
          </Link>
          <Link href="/#products" className={linkClass("products")}>
            {t.products}
          </Link>
          <Link href="/#about" className={linkClass("about")}>
            {t.about}
          </Link>
          <Link href="/#contact" className={linkClass("contact")}>
            {t.contact}
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === "en" ? "id" : "en")}
            className="
              px-3 py-1
              rounded-md
              text-sm
              bg-gray-100
              text-gray-700
              hover:bg-gray-200
              transition
            "
          >
            {lang.toUpperCase()}
          </button>

          <Link
            href="/catalog"
            className="px-5 py-2.5 rounded-lg bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition"
          >
            {t.catalog}
          </Link>
        </div>
        <button
          className="
            md:hidden
            fixed top-4 right-4
            z-[9999]
            flex items-center justify-center
            w-10 h-10
            bg-white
            rounded-lg
            shadow
            text-black
          "
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-xl font-semibold">
          <Link
            href="/#home"
            className={mobileLinkClass("home")}
            onClick={() => setOpen(false)}
          >
            {t.home}
          </Link>

          <Link
            href="/#products"
            className={mobileLinkClass("products")}
            onClick={() => setOpen(false)}
          >
            {t.products}
          </Link>

          <Link
            href="/#about"
            className={mobileLinkClass("about")}
            onClick={() => setOpen(false)}
          >
            {t.about}
          </Link>

          <Link
            href="/#contact"
            className={mobileLinkClass("contact")}
            onClick={() => setOpen(false)}
          >
            {t.contact}
          </Link>

          <button
            onClick={() => setLang(lang === "en" ? "id" : "en")}
            className="
              px-3 py-1
              rounded-md
              text-sm
              bg-gray-100
              text-gray-700
              hover:bg-gray-200
              transition
            "
          >
            {lang.toUpperCase()}
          </button>

          <Link
            href="/catalog"
            className="px-6 py-3 bg-orange-500 text-white rounded-xl shadow-lg font-semibold"
          >
            {t.catalog}
          </Link>
        </div>
      </div>
    </header>
  );
}
