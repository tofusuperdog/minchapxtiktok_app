"use client";

import { useLanguage } from "../LanguageContext";
import Link from "next/link";
import Image from "next/image";

export default function AppProfile() {
  const { t } = useLanguage();

  const menuItems = [
    { id: "terms", label: t("terms"), icon: "/term.svg", path: "/app/terms" },
    { id: "policy", label: t("privacy"), icon: "/policy.svg", path: "/app/policy" },
    { id: "contact", label: t("contact"), icon: "/contact.svg", path: "/app/contact" },
  ];

  return (
    <div className="flex flex-col w-full h-[calc(100vh-130px)] overflow-hidden bg-black text-white px-4 pt-6">

      {/* User Info Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex flex-col items-center">
          <div className="w-[85px] h-[85px] relative">
            <img
              src="/minchapcolor.svg"
              alt="Profile"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-xl font-bold tracking-tight">{t("user_id")}</h2>
          <div className="text-[13px] text-white/70">uid: 200234</div>
          <div className="text-[13px] text-white/70">{t("version")} 1.01</div>
        </div>
      </div>

      {/* Minchap-VIP Card */}
      <div className="w-full rounded-2xl border border-[#BF8EFF]/30 bg-[#1A1A1A] p-4 flex items-center justify-between mb-4 shadow-[0_0_20px_rgba(191,142,255,0.05)]">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 relative">
            <img src="/popcorn.svg" alt="Popcorn" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-white leading-tight">Minchap - VIP</h3>
            <p className="text-[11px] text-white/50">{t("unlimited_watch")}</p>
          </div>
        </div>
        <Link href="/app/vip" className="bg-[#6000B3] hover:bg-[#7a00e6] text-white text-[12px] font-bold px-4 py-2 rounded-lg transition-colors shadow-lg">
          {t("subscribe_now")}
        </Link>
      </div>

      {/* Credit Unlock Session */}
      <div className="w-full rounded-2xl bg-[#1A1A1A] flex flex-col mb-8 overflow-hidden border border-white/5">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <span className="text-sm font-medium text-white/90 tracking-wide">{t("unlock_credit")}</span>
          <Link href="/app/bill" className="text-[11px] text-white/40 flex items-center gap-1 hover:text-white/60 transition-colors">
            {t("details")} &gt;
          </Link>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-white mb-1">0 {t("episodes_unit")}</div>
            <div className="text-[11px] text-white/40">{t("unlockable_desc")}</div>
          </div>
          <Link href="/app/topup" className="bg-[#6000B3] hover:bg-[#7a00e6] text-white text-[12px] font-bold px-5 py-2.5 rounded-lg transition-colors shadow-lg">
            {t("add_episodes")}
          </Link>
        </div>
      </div>

      {/* Menu List */}
      <div className="flex flex-col">
        {menuItems.map((item, index) => (
          <div key={item.id}>
            <Link href={item.path || "#"} className="w-full flex items-center gap-4 py-4 active:bg-white/5 transition-colors text-left group">
              <div className="w-6 h-6 flex items-center justify-center opacity-70 group-active:opacity-100">
                <img src={item.icon} alt={item.label} className="w-full h-full object-contain" />
              </div>
              <span className="text-[15px] font-medium text-white/90 group-active:text-white">{item.label}</span>
            </Link>
            {index < menuItems.length - 1 && (
              <div className="h-[1px] w-full bg-white/5" />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
