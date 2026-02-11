"use client";

import { createContext, useContext, useState } from "react";

type LangType = "en" | "id";

type LangContextType = {
  lang: LangType;
  setLang: (lang: LangType) => void;
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LangType>("en");

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
