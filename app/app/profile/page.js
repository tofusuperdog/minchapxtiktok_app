"use client";

import { useLanguage } from "../LanguageContext";

export default function AppProfile() {
  const { t } = useLanguage();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-white mt-20">
      <h1 className="text-2xl font-bold mb-2">{t("profile")}</h1>
      <p className="text-sm text-white/50">{t("empty_desc")}</p>
    </div>
  );
}
