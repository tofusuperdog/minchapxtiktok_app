"use client";

import { useLanguage } from "../LanguageContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// BeanIcon replaced by bean.svg in public folder

export default function TopupPage() {
  const { t, language, changeLanguage } = useLanguage();
  const router = useRouter();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const languages = ["TH", "EN", "JP", "CN"];

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

  const [episodes, setEpisodes] = useState([]);
  const [vipPackages, setVipPackages] = useState([]);
  const [settings, setSettings] = useState({ is_episodes_active: true, is_vip_active: true });
  const [loading, setLoading] = useState(true);

  const SUPABASE_URL = "https://vxskkaxvlgycokdtuocj.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_EulroVhS18qjuuQ31ERKig_0memrNhJ";

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchEpisodes = fetch(`${SUPABASE_URL}/rest/v1/episode_package?select=*&show_price=eq.true&order=sort_order`, {
          headers: {
             "apikey": SUPABASE_ANON_KEY,
             "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        const fetchVip = fetch(`${SUPABASE_URL}/rest/v1/vip_package?select=*&order=sort_order`, {
          headers: {
             "apikey": SUPABASE_ANON_KEY,
             "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          }
        });

        const fetchSettings = fetch(`${SUPABASE_URL}/rest/v1/app_settings?select=*&id=eq.1`, {
          headers: {
             "apikey": SUPABASE_ANON_KEY,
             "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          }
        });

        const [episodesRes, vipRes, settingsRes] = await Promise.all([fetchEpisodes, fetchVip, fetchSettings]);
        const epsData = await episodesRes.json();
        const vipData = await vipRes.json();
        const settData = await settingsRes.json();

        setEpisodes(epsData);
        setVipPackages(vipData);
        if (settData && settData.length > 0) {
          setSettings(settData[0]);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getVipPackageTitle = (pkg) => {
    const type = pkg.type.toLowerCase();
    if (type.includes("สัปดาห์") || type.includes("weekly")) return t("weekly_vip");
    if (type.includes("เดือน") || type.includes("monthly")) return t("monthly_vip");
    return pkg.type;
  };

  const getPriceInfo = (pkg) => {
    switch(language) {
      case "EN": return { price: pkg.price_usd, unit: "USD" };
      case "JP": return { price: pkg.price_jpy, unit: "JPY" };
      case "CN": return { price: pkg.price_cny, unit: "CNY" };
      default: return { price: pkg.price_thb, unit: t("price_baht") };
    }
  };

  const replaceUnlockText = (n) => {
    // If language doesn't have format string, provide fallback
    const templ = t("unlock_text");
    return templ.includes("{n}") ? templ.replace("{n}", n) : `ปลดล็อกได้ ${n} ตอน`;
  };

  const replaceDiscountText = (p) => {
    const templ = t("discount_text");
    return templ.includes("{p}") ? templ.replace("{p}", p) : `ลด ${p}%`;
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#07050A] text-white pb-10">
      
      {/* Header matching VIP page style */}
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

      {loading ? (
        <div className="w-full flex-1 flex justify-center items-center h-[60vh]">
           <div className="w-6 h-6 border-2 border-[#BF8EFF] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col px-4 pt-6 gap-10">
          
          {!settings.is_episodes_active && !settings.is_vip_active ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center pb-12">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#BF8EFF]"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("not_supported")}</h3>
              <p className="text-white/60 text-base leading-relaxed max-w-xs">
                {t("purchase_system_disabled")}
              </p>
            </div>
          ) : (
            <>
              {/* Episode Packages Section */}
              {settings.is_episodes_active && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4 pl-1">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <img src="/episodeicon.svg" alt="Episode Icon" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-xl font-bold">{t("add_episodes")}</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pb-2">
                    {episodes.map(epi => (
                      <div 
                        key={epi.id} 
                        className={`relative flex flex-col justify-center rounded-xl p-4 border transition-transform active:scale-95 cursor-pointer ${
                          epi.badge_color ? "bg-[#4A00A0] border-[#6000B3]" : "bg-transparent border-[#4A2574]"
                        }`}
                      >
                        {epi.badge_discount && (
                          <div className={`absolute -top-px -right-px px-2.5 py-1 rounded-bl-lg rounded-tr-xl text-[10px] font-bold ${epi.badge_color ? "bg-[#E91E63] text-white" : "bg-transparent border-b border-l border-[#4A2574] text-white/80"}`}>
                              {replaceDiscountText(epi.discount_percent)}
                          </div>
                        )}
                        <div className="flex items-center gap-2 mb-1.5">
                          <img src="/bean.svg" alt="Bean" className="w-6 h-6 object-contain" />
                          <span className="text-[26px] font-medium leading-none">{epi.price}</span>
                        </div>
                        <div className={`text-[12px] font-light ${epi.badge_color ? "text-white/90" : "text-white/60"}`}>
                          {replaceUnlockText(epi.unlock_episodes)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VIP Packages Section */}
              {settings.is_vip_active && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4 pl-1">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <img src="/popcorn.svg" alt="Popcorn" className="w-full h-full object-contain drop-shadow" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Minchap - VIP</h2>
                  </div>
                  
                  <div className="flex flex-col gap-3 mb-6">
                    {vipPackages.map((pkg) => {
                      const { price, unit } = getPriceInfo(pkg);
                      const title = getVipPackageTitle(pkg);
                      
                      return (
                        <div 
                          key={pkg.id}
                          className={`relative w-full rounded-xl p-4 px-5 flex justify-between items-center transition-all active:scale-95 cursor-pointer border ${
                            pkg.is_recommended 
                              ? "bg-[#4A00A0] border-[#6000B3] shadow-[0_5px_20px_rgba(74,0,160,0.3)]" 
                              : "bg-transparent border-[#4A2574]"
                          }`}
                        >
                          {pkg.is_recommended && (
                            <div className="absolute top-0 right-0 bg-[#E91E63] text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl shadow-lg">
                              {t("popular_badge")}
                            </div>
                          )}
                          
                          <div className="flex items-start gap-4">
                            {pkg.is_recommended ? (
                              <div className="w-6 h-6 mt-0.5">
                                <img src="/popcorn.svg" alt="VIP" className="w-full h-full object-contain drop-shadow" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 mt-0.5 opacity-80">
                                <img src="/popcorn.svg" alt="VIP" className="w-full h-full object-contain" />
                              </div>
                            )}
                            <div className="flex flex-col text-left">
                              <h3 className={`text-[17px] font-bold leading-tight mb-1 ${!pkg.is_recommended && "text-white/90"}`}>{title}</h3>
                              <p className={`text-[12px] font-medium ${pkg.is_recommended ? "text-white/90" : "text-white/70"}`}>{t("unlimited_watch")}</p>
                              <p className={`text-[10px] mt-0.5 ${pkg.is_recommended ? "text-white/70" : "text-white/50"}`}>{t("automatic_renewal")}</p>
                            </div>
                          </div>
                          
                          <div className={`text-xl font-bold flex gap-1 items-baseline pt-2 ${!pkg.is_recommended && "text-white/90"}`}>
                            <span>{price}</span>
                            <span className="text-[14px]">{unit}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Benefits Box */}
                  <div className="w-full rounded-xl bg-[#121212] border border-white/5 p-5 shadow-inner mb-6">
                    <h4 className="text-[15px] font-medium text-white mb-4 tracking-wide">{t("vip_benefits")}</h4>
                    <div className="flex flex-col gap-3.5">
                      {[t("no_ads"), t("all_episodes"), t("unlimited_rewatch")].map((text, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="flex items-center justify-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <span className="text-[14px] text-white/80 font-light">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
