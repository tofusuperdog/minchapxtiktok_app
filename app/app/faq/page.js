"use client";

import Link from "next/link";
import { useLanguage } from "../LanguageContext";

const faqContent = {
  TH: {
    title: "คำถามที่พบบ่อย",
    items: [
      {
        question: "VIP ใช้ดูอะไรได้บ้าง?",
        answer: "VIP ใช้สำหรับดูซีรีส์ได้ไม่จำกัดตามแพ็กเกจที่สมัคร",
      },
      {
        question: "ดูประวัติการสมัครได้ที่ไหน?",
        answer: "สามารถดูได้จากเมนูประวัติการสมัครในหน้าโปรไฟล์",
      },
      {
        question: "ต้องการความช่วยเหลือติดต่อที่ไหน?",
        answer: "สามารถติดต่อทีมงานผ่านเมนูติดต่อเราในหน้าโปรไฟล์",
      },
    ],
  },
  EN: {
    title: "FAQ",
    items: [
      {
        question: "What can I watch with VIP?",
        answer: "VIP lets you watch series without limits based on your plan.",
      },
      {
        question: "Where can I view subscription history?",
        answer: "Use the Subscription History menu on the profile page.",
      },
      {
        question: "Where can I get help?",
        answer: "Contact support from the Contact Us menu on the profile page.",
      },
    ],
  },
  JP: {
    title: "よくある質問",
    items: [
      {
        question: "VIPでは何を視聴できますか?",
        answer: "VIPでは、プランに応じてシリーズを制限なく視聴できます。",
      },
      {
        question: "購読履歴はどこで確認できますか?",
        answer: "プロフィールページの購読履歴メニューから確認できます。",
      },
      {
        question: "サポートへの連絡方法は?",
        answer: "プロフィールページのお問い合わせメニューから連絡できます。",
      },
    ],
  },
  CN: {
    title: "常见问题",
    items: [
      {
        question: "VIP 可以观看什么内容?",
        answer: "VIP 可根据订阅套餐无限观看剧集。",
      },
      {
        question: "在哪里查看订阅历史?",
        answer: "可在个人资料页面的订阅历史菜单中查看。",
      },
      {
        question: "在哪里获得帮助?",
        answer: "可通过个人资料页面的联系我们菜单联系支持团队。",
      },
    ],
  },
};

export default function AppFaq() {
  const { t, language } = useLanguage();
  const content = faqContent[language] || faqContent.TH;

  return (
    <div className="flex min-h-screen w-full flex-col overflow-y-auto bg-black px-6 pb-8 pt-6 text-white no-scrollbar">
      <div className="mb-8">
        <Link
          href="/app/profile"
          className="mb-6 flex items-center gap-1 text-sm text-[#BF8EFF] transition-colors hover:text-white"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("profile")}
        </Link>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          {content.title}
        </h1>
      </div>

      <div className="space-y-4">
        {content.items.map((item) => (
          <section
            key={item.question}
            className="rounded-[16px] border border-white/10 bg-white/[0.055] p-5 shadow-[inset_0_0_16px_rgba(255,255,255,0.04)]"
          >
            <h2 className="mb-2 text-[17px] font-extrabold leading-tight text-white">
              {item.question}
            </h2>
            <p className="text-[14px] leading-relaxed text-white/70">
              {item.answer}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
