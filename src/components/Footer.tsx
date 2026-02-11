"use client";

import { useLang } from "@/context/LanguageContext";
import { dictionary } from "@/context/dictionary";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const { lang } = useLang();
  const t = dictionary[lang];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo-damarus.png"
              alt="Damarus Logo"
              width={32}
              height={32}
            />

            <h3 className="text-xl font-bold text-white">DAMARUS FOOD</h3>
          </div>

          <p className="text-sm leading-relaxed">{t.footerDesc}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t.company}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#home" className="hover:text-orange-400">
                {lang === "id" ? "Beranda" : "Home"}
              </Link>
            </li>

            <li>
              <Link href="/#products" className="hover:text-orange-400">
                {lang === "id" ? "Produk" : "Products"}
              </Link>
            </li>

            <li>
              <Link href="/#about" className="hover:text-orange-400">
                {lang === "id" ? "Tentang" : "About"}
              </Link>
            </li>

            <li>
              <Link href="/#contact" className="hover:text-orange-400">
                {t.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t.support}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/faq" className="hover:text-orange-400">
                FAQ
              </Link>
            </li>

            <li>
              <Link href="/privacy" className="hover:text-orange-400">
                {t.privacy}
              </Link>
            </li>

            <li>
              <Link href="/terms" className="hover:text-orange-400">
                {lang === "id" ? "Ketentuan" : "Terms"}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t.contact}</h4>
          <div className="space-y-2 text-sm">
            <div>Email: info@damarusfood.com</div>
            <div>Phone: +62 812 0000 0000</div>
            <div>Indonesia</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Damarus Food Industri
      </div>
    </footer>
  );
}
