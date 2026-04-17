"use client";

import { useLanguage } from "../LanguageContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function VipPage() {
  const { t, language, changeLanguage } = useLanguage();
  const router = useRouter();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const langDropdownRef = useRef(null);
  const languages = ["TH", "EN", "JP", "CN"];

  const SUPABASE_URL = "https://vxskkaxvlgycokdtuocj.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_EulroVhS18qjuuQ31ERKig_0memrNhJ";

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/vip_package?select=*&order=sort_order`, {
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        const data = await response.json();
        setPackages(data);
      } catch (err) {
        console.error("Failed to fetch VIP packages:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const benefits = [
    { id: 1, text: t("no_ads") },
    { id: 2, text: t("all_episodes") },
    { id: 3, text: t("unlimited_rewatch") },
  ];

  // Map database type to localized title if possible, else use DB type
  const getPackageTitle = (pkg) => {
    const type = pkg.type.toLowerCase();
    if (type.includes("สัปดาห์") || type.includes("weekly")) return t("weekly_vip");
    if (type.includes("เดือน") || type.includes("monthly")) return t("monthly_vip");
    return pkg.type;
  };

  // Get price and unit based on language
  const getPriceInfo = (pkg) => {
    switch(language) {
      case "EN": return { price: pkg.price_usd, unit: "USD" };
      case "JP": return { price: pkg.price_jpy, unit: "JPY" };
      case "CN": return { price: pkg.price_cny, unit: "CNY" };
      default: return { price: pkg.price_thb, unit: t("price_baht") };
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-black text-white overflow-hidden pb-10">
      
      {/* Custom Header based on Screenshot */}
      <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between px-4 bg-black/80 backdrop-blur-md">
        <button onClick={() => router.back()} className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        
        <div className="flex items-center">
          <img src="/minchap.svg" alt="MinChap" className="h-6 w-auto object-contain" />
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selection Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 rounded bg-[#1A1A1A] px-2 py-1 text-xs font-semibold text-white/90 border border-white/10 uppercase"
            >
              {language}
              <svg className={`h-3 w-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-20 rounded-lg bg-[#1A1A1A] shadow-lg border border-white/10 py-1 flex flex-col z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      changeLanguage(lang);
                      setIsLangOpen(false);
                    }}
                    className={`px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors ${language === lang ? 'text-white font-bold' : 'text-white/60'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="flex items-center justify-center h-8 w-8 rounded text-white/90">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
          </button>
          <button onClick={() => router.push("/app")} className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 flex flex-col pt-4">
        
        {/* VIP Branding Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-[100px] h-[100px] relative">
            <img src="/minchapcolor.svg" alt="MinChap VIP" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-4xl font-bold tracking-tight">{t("subscribe_vip")}</h1>
            <p className="text-sm text-white/60 font-medium">{t("unlimited_watch")}</p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col gap-4 mb-8">
          {loading ? (
            <div className="w-full py-10 flex justify-center">
              <div className="w-6 h-6 border-2 border-[#BF8EFF] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            packages.map((pkg) => {
              const { price, unit } = getPriceInfo(pkg);
              const title = getPackageTitle(pkg);
              
              return (
                <div 
                  key={pkg.id}
                  className={`relative w-full rounded-2xl p-5 overflow-hidden transition-all active:scale-95 scroll-mt-20 ${
                    pkg.is_recommended 
                      ? "bg-gradient-to-r from-[#6000B3] to-[#8A2BE2] shadow-[0_10px_30px_rgba(96,0,179,0.3)] border border-[#BF8EFF]/30" 
                      : "bg-[#121212] border border-white/10"
                  }`}
                >
                  {pkg.is_recommended && (
                    <div className="absolute top-0 right-0 bg-[#E91E63] text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl shadow-lg uppercase tracking-wider">
                      {t("popular_badge")}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 mt-1">
                        <img src="/popcorn.svg" alt="Plan icon" className={`w-full h-full object-contain ${!pkg.is_recommended && "opacity-70"}`} />
                      </div>
                      <div className="flex flex-col text-left">
                        <h3 className={`text-xl font-bold mb-0.5 ${!pkg.is_recommended && "text-white/90"}`}>{title}</h3>
                        <p className={`text-[12px] font-medium ${pkg.is_recommended ? "text-white/90" : "text-white/60"}`}>{t("unlimited_watch")}</p>
                        <p className={`text-[10px] mt-1 ${pkg.is_recommended ? "text-white/60" : "text-white/40"}`}>{t("automatic_renewal")}</p>
                      </div>
                    </div>
                    <div className={`text-xl font-bold whitespace-nowrap pt-2 ${!pkg.is_recommended && "text-white/90"}`}>
                      {price} {unit}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Benefits Box */}
        <div className="w-full rounded-2xl bg-[#1A1A1A] border border-white/5 p-6 shadow-inner">
          <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wide text-left">{t("vip_benefits")}</h4>
          <div className="flex flex-col gap-4">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="flex items-center gap-3">
                <div className="flex items-center justify-center text-[#BF8EFF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-[14px] text-white/80 font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
