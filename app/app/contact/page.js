"use client";

import { useLanguage } from "../LanguageContext";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ContactPage() {
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

  return (
    <div className="flex flex-col w-full min-h-screen bg-black text-white overflow-y-auto pb-10">
      
      {/* Header matching screenshot */}
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
          
          <button className="flex items-center justify-center h-8 w-8 rounded text-white/90 opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
          </button>
          <button onClick={() => router.push("/app")} className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 flex flex-col pt-6 items-center w-full">
        
        <h1 className="text-2xl font-bold mb-8 text-center">{t("contact_us_title")}</h1>

        <div className="w-full flex flex-col gap-6">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-white/70">{t("name_label")}</label>
            <input 
              type="text" 
              className="w-full h-12 bg-[#E6E6E6] rounded-xl px-4 text-black focus:outline-none placeholder:text-black/30"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-white/70">{t("email_label")}</label>
            <input 
              type="email" 
              className="w-full h-12 bg-[#E6E6E6] rounded-xl px-4 text-black focus:outline-none placeholder:text-black/30"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-white/70">{t("message_label")}</label>
            <textarea 
              rows={8}
              className="w-full bg-[#E6E6E6] rounded-xl p-4 text-black focus:outline-none resize-none placeholder:text-black/30"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4 flex flex-col items-center gap-6">
            <button className="w-full max-w-[200px] h-11 bg-[#7B4DFF] hover:bg-[#8e66ff] active:scale-95 transition-all rounded-xl font-bold text-white shadow-lg">
              {t("send_message")}
            </button>

            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-[13px] text-white font-medium">{t("contact_thanks")}</p>
              <p className="text-[13px] text-white/60">{t("contact_response_time")}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
