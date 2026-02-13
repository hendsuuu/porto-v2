"use client";

import { useLang } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "id" ? "en" : "id")}
      className="
        select-none
        h-10 px-3
        cursor-pointer
        inline-flex items-center justify-center
        rounded-xl
        border border-[color:var(--border)]
        bg-[color:var(--surface)]
        text-sm font-medium
        text-[color:var(--text)]
        hover:bg-[color:var(--bg-secondary)]
        transition
      "
      aria-label="Toggle language"
      title="Toggle language"
    >
      {lang === "id" ? "ID" : "EN"}
    </button>
  );
}
