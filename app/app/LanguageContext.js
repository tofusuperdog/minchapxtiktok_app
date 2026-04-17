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
    coming_soon: "ฟีเจอร์นี้จะเปิดให้ใช้งานเร็วๆ นี้",
    user_id: "รหัสผู้ใช้งาน",
    version: "เวอร์ชั่น",
    unlimited_watch: "ดูซีรีส์ได้ไม่จำกัด",
    subscribe_now: "สมัครเลย",
    unlock_credit: "เครดิตปลดล็อก",
    details: "รายละเอียด",
    episodes_unit: "ตอน",
    unlockable_desc: "จำนวนตอนที่ปลดล็อกได้",
    add_episodes: "เพิ่มตอน",
    unlock_text: "ปลดล็อกได้ {n} ตอน",
    discount_text: "ลด {p}%",
    terms: "ข้อกำหนดการใช้งาน",
    privacy: "นโยบายความเป็นส่วนตัว",
    contact: "ติดต่อเรา",
    subscribe_vip: "สมัคร VIP",
    weekly_vip: "รายสัปดาห์ - VIP",
    monthly_vip: "รายเดือน - VIP",
    popular_badge: "ยอดนิยม",
    automatic_renewal: "ต่ออายุอัตโนมัติ ยกเลิกได้ตลอดเวลา",
    vip_benefits: "ข้อดีของการเป็น VIP",
    no_ads: "ไม่มีโฆษณา",
    all_episodes: "ดูซีรีส์ได้ทุกตอน",
    unlimited_rewatch: "ดูกี่รอบก็ได้",
    price_baht: "บาท",
    contact_us_title: "ติดต่อเรา",
    name_label: "ชื่อ",
    email_label: "อีเมล",
    message_label: "ข้อความ",
    send_message: "ส่งข้อความ",
    contact_thanks: "ขอบคุณสำหรับการสนับสนุน",
    contact_response_time: "ปกติเราจะติดต่อกลับภายใน 72 ชั่วโมง",
    purchase_history: "ประวัติการซื้อ",
    jan: "ม.ค.",
    feb: "ก.พ.",
    mar: "มี.ค.",
    apr: "เม.ย.",
    may: "พ.ค.",
    jun: "มิ.ย.",
    jul: "ก.ค.",
    aug: "ส.ค.",
    sep: "ก.ย.",
    oct: "ต.ค.",
    nov: "พ.ย.",
    dec: "ธ.ค."
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
    coming_soon: "Coming soon",
    user_id: "User ID",
    version: "Version",
    unlimited_watch: "Unlimited Watch",
    subscribe_now: "Subscribe Now",
    unlock_credit: "Unlock Credit",
    details: "Details",
    episodes_unit: "Episodes",
    unlockable_desc: "Unlockable episodes",
    add_episodes: "Add episodes",
    unlock_text: "Unlock {n} episodes",
    discount_text: "{p}% Off",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    contact: "Contact Us",
    subscribe_vip: "Subscribe VIP",
    weekly_vip: "Weekly - VIP",
    monthly_vip: "Monthly - VIP",
    popular_badge: "Popular",
    automatic_renewal: "Auto-renews, cancel anytime",
    vip_benefits: "VIP Benefits",
    no_ads: "No Ads",
    all_episodes: "Watch all episodes",
    unlimited_rewatch: "Unlimited rewatch",
    price_baht: "THB",
    contact_us_title: "Contact Us",
    name_label: "Name",
    email_label: "Email",
    message_label: "Message",
    send_message: "Send Message",
    contact_thanks: "Thank you for your support",
    contact_response_time: "We usually reply within 72 hours",
    purchase_history: "Purchase History",
    jan: "Jan",
    feb: "Feb",
    mar: "Mar",
    apr: "Apr",
    may: "May",
    jun: "Jun",
    jul: "Jul",
    aug: "Aug",
    sep: "Sep",
    oct: "Oct",
    nov: "Nov",
    dec: "Dec"
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
    coming_soon: "近日公開",
    user_id: "ユーザーID",
    version: "バージョン",
    unlimited_watch: "無制限視聴",
    subscribe_now: "今すぐ購読",
    unlock_credit: "クレジット解除",
    details: "詳細",
    episodes_unit: "エピソード",
    unlockable_desc: "解除可能なエピソード",
    add_episodes: "エピソード追加",
    unlock_text: "{n}エピソード解除",
    discount_text: "{p}%オフ",
    terms: "利用規約",
    privacy: "プライバシーポリシー",
    contact: "お問い合わせ",
    subscribe_vip: "VIPを購読",
    weekly_vip: "週間 - VIP",
    monthly_vip: "月間 - VIP",
    popular_badge: "人気",
    automatic_renewal: "自動更新、いつでもキャンセル可能",
    vip_benefits: "VIPの特典",
    no_ads: "広告なし",
    all_episodes: "すべてのエピソードを視聴",
    unlimited_rewatch: "無制限の再視聴",
    price_baht: "バーツ",
    contact_us_title: "お問い合わせ",
    name_label: "名前",
    email_label: "メール",
    message_label: "メッセージ",
    send_message: "メッセージ送信",
    contact_thanks: "ご支援ありがとうございます",
    contact_response_time: "通常72時間以内に返信いたします",
    purchase_history: "購入履歴",
    jan: "1月",
    feb: "2月",
    mar: "3月",
    apr: "4月",
    may: "5月",
    jun: "6月",
    jul: "7月",
    aug: "8月",
    sep: "9月",
    oct: "10月",
    nov: "11月",
    dec: "12月"
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
    coming_soon: "敬请期待",
    user_id: "用户ID",
    version: "版本",
    unlimited_watch: "无限观看",
    subscribe_now: "立即订阅",
    unlock_credit: "解锁额度",
    details: "详情",
    episodes_unit: "集",
    unlockable_desc: "可解锁集数",
    add_episodes: "增加集数",
    unlock_text: "可解锁 {n} 集",
    discount_text: "降价 {p}%",
    terms: "使用条款",
    privacy: "隐私政策",
    contact: "联系我们",
    subscribe_vip: "订阅 VIP",
    weekly_vip: "每周 - VIP",
    monthly_vip: "每月 - VIP",
    popular_badge: "最受欢迎",
    automatic_renewal: "自动续订，随时取消",
    vip_benefits: "VIP 权益",
    no_ads: "无广告",
    all_episodes: "观看所有集数",
    unlimited_rewatch: "无限次观看",
    price_baht: "泰铢",
    contact_us_title: "联系我们",
    name_label: "姓名",
    email_label: "电子邮件",
    message_label: "消息",
    send_message: "发送消息",
    contact_thanks: "感谢您的支持",
    contact_response_time: "我们通常在 72 小时内回复",
    purchase_history: "购买历史",
    jan: "1月",
    feb: "2月",
    mar: "3月",
    apr: "4月",
    may: "5月",
    jun: "6月",
    jul: "7月",
    aug: "8月",
    sep: "9月",
    oct: "10月",
    nov: "11月",
    dec: "12月"
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
    // Fallback to TH if key doesn't exist in selected language
    return translations[language][key] || translations["TH"][key] || key;
  };

  if (!mounted) {
    return null;
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
