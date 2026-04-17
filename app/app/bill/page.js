"use client";

import { useLanguage } from "../LanguageContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function BillPage() {
  const { t, language, changeLanguage } = useLanguage();
  const router = useRouter();

  const [selectedMonth, setSelectedMonth] = useState("jan");
  const [selectedYear, setSelectedYear] = useState(2026);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  const languages = ["TH", "EN", "JP", "CN"];
  const months = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec"
  ];

  const years = Array.from({ length: 10 }, (_, i) => 2026 + i);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
        setIsMonthOpen(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setIsYearOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-black text-white">
      
      {/* Header matching the image */}
      <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between px-4 bg-black/80 backdrop-blur-md">
        <button onClick={() => router.back()} className="p-1 text-white/70 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        
        <div className="flex items-center">
          <img src="/minchap.svg" alt="MinChap" className="h-6 w-auto object-contain" />
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selection */}
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
          
          <button onClick={() => router.push("/app")} className="p-1 text-white/70 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </header>

      <div className="flex flex-col px-4 pt-4">
        
        {/* Balance Card */}
        <div className="w-full rounded-xl bg-[#121212] border border-white/5 p-8 flex flex-col items-center justify-center mb-8">
          <p className="text-[13px] text-white/50 mb-2">{t("unlockable_desc")}</p>
          <h1 className="text-[32px] font-bold mb-6">0 {t("episodes_unit")}</h1>
          
          <Link 
            href="/app/topup" 
            className="bg-[#6000B3] hover:bg-[#7a00e6] text-white text-[14px] font-bold px-12 py-2.5 rounded-lg transition-colors shadow-lg"
          >
            {t("add_episodes")}
          </Link>
        </div>

        {/* Purchase History Section */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[17px] font-bold">{t("purchase_history")}</h2>
            
            <div className="flex items-center gap-1">
              {/* Month Selector */}
              <div className="relative" ref={monthDropdownRef}>
                <button 
                  onClick={() => { setIsMonthOpen(!isMonthOpen); setIsYearOpen(false); }}
                  className="flex items-center gap-1 text-[13px] font-medium text-white/70 bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors"
                >
                  <span>{t(selectedMonth)}</span>
                  <svg className={`h-3 w-3 opacity-50 transition-transform ${isMonthOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isMonthOpen && (
                  <div className="absolute right-0 mt-2 w-24 max-h-48 overflow-y-auto rounded-lg bg-[#1A1A1A] shadow-xl border border-white/10 py-1 z-40">
                    {months.map((m) => (
                      <button
                        key={m}
                        onClick={() => { setSelectedMonth(m); setIsMonthOpen(false); }}
                        className={`w-full px-4 py-2 text-xs text-left hover:bg-white/10 transition-colors ${selectedMonth === m ? 'text-white font-bold' : 'text-white/60'}`}
                      >
                        {t(m)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Year Selector */}
              <div className="relative" ref={yearDropdownRef}>
                <button 
                  onClick={() => { setIsYearOpen(!isYearOpen); setIsMonthOpen(false); }}
                  className="flex items-center gap-1 text-[13px] font-medium text-white/70 bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors"
                >
                  <span>{selectedYear}</span>
                  <svg className={`h-3 w-3 opacity-50 transition-transform ${isYearOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isYearOpen && (
                  <div className="absolute right-0 mt-2 w-24 max-h-48 overflow-y-auto rounded-lg bg-[#1A1A1A] shadow-xl border border-white/10 py-1 z-40">
                    {years.map((y) => (
                      <button
                        key={y}
                        onClick={() => { setSelectedYear(y); setIsYearOpen(false); }}
                        className={`w-full px-4 py-2 text-xs text-left hover:bg-white/10 transition-colors ${selectedYear === y ? 'text-white font-bold' : 'text-white/60'}`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Empty State / List Placeholder */}
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            {/* You can add a list of items here if you have data */}
          </div>
        </div>

      </div>

    </div>
  );
}
