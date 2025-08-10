"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="inline-flex rounded-xl border border-slate-200 overflow-hidden">
      <button
        className={`px-3 py-1.5 text-sm hover:bg-slate-100 ${lang === "EN" ? "bg-slate-100" : ""}`}
        onClick={() => setLang("EN")}
      >
        EN
      </button>
      <button
        className={`px-3 py-1.5 text-sm hover:bg-slate-100 ${lang === "TH" ? "bg-slate-100" : ""}`}
        onClick={() => setLang("TH")}
      >
        TH
      </button>
    </div>
  );
}
