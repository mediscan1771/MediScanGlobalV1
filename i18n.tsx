"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { en } from "@/translations/en";
import { th } from "@/translations/th";

export type Lang = "EN" | "TH";
type Dict = typeof en;

const maps: Record<Lang, Dict> = { EN: en, TH: th };

type Ctx = {
  lang: Lang;
  setLang: (v: Lang) => void;
  t: (key: keyof Dict) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("EN");

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mediscan_lang") as Lang | null;
      if (saved === "EN" || saved === "TH") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("mediscan_lang", lang); } catch {}
  }, [lang]);

  const dict = maps[lang];
  const t = useMemo(() => ((key: keyof Dict) => dict[key] ?? String(key)), [dict]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
