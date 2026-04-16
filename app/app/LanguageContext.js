"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  TH: {
    home: "หน้าหลัก",
    myseries: "ซีรีส์ของฉัน",
    search: "ค้นหา",
    profile: "โปรไฟล์",
    empty_desc: "หน้าเปล่า",
    not_supported: "ไม่รองรับการใช้งาน",
    not_supported_desc: "ระบบนี้ออกแบบมาเพื่อใช้งานบนโทรศัพท์มือถือเท่านั้น โปรดเข้าใช้งานผ่านมือถือครับ",
    share_tiktok: "แชร์ไปยัง TikTok",
    coming_soon: "ฟีเจอร์นี้จะเปิดให้ใช้งานเร็วๆ นี้"
  },
  EN: {
    home: "Home",
    myseries: "My Series",
    search: "Search",
    profile: "Profile",
    empty_desc: "Empty Page",
    not_supported: "Not Supported",
    not_supported_desc: "This system is designed for mobile phones only. Please access via mobile.",
    share_tiktok: "Share to TikTok",
    coming_soon: "Coming soon"
  },
  JP: {
    home: "ホーム",
    myseries: "マイシリーズ",
    search: "検索",
    profile: "プロフィール",
    empty_desc: "空白のページ",
    not_supported: "サポートされていません",
    not_supported_desc: "このシステムは携帯電話専用です。携帯電話からアクセスしてください。",
    share_tiktok: "TikTokにシェア",
    coming_soon: "近日公開"
  },
  CN: {
    home: "首页",
    myseries: "我的剧集",
    search: "搜索",
    profile: "个人资料",
    empty_desc: "空白页",
    not_supported: "不支持",
    not_supported_desc: "本系统专为手机设计。请通过手机访问。",
    share_tiktok: "分享到 TikTok",
    coming_soon: "敬请期待"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("TH");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("minchap_lang");
    if (saved && translations[saved]) {
      setLanguage(saved);
    }
    setMounted(true);
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem("minchap_lang", lang);
    }
  };

  const t = (key) => {
    // Fallback to TH if key doesn't exist in selected language (shouldn't happen but good practice)
    return translations[language][key] || translations["TH"][key] || key;
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null; // Or a loading spinner if preferred
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
