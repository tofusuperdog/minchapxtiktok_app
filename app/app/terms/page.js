"use client";

import { useLanguage } from "../LanguageContext";
import Link from "next/link";

const termsContent = {
  TH: {
    title: "ข้อกำหนดการใช้งาน",
    effectiveDate: "เริ่มมีผลบังคับใช้: 19 กันยายน 2567",
    intro: "ข้อกำหนดการใช้งานเหล่านี้ควบคุมการใช้แอปพลิเคชัน minchap ของคุณ โปรดอ่านและทำความเข้าใจก่อนเริ่มใช้งานแอปพลิเคชัน",
    sections: [
      {
        title: "1. การยอมรับข้อกำหนด",
        content: "ในการเข้าถึงและใช้งานแอปพลิเคชัน minchap คุณตกลงและยอมรับข้อกำหนดการใช้งานเหล่านี้ หากคุณไม่ตกลงตามข้อกำหนดเหล่านี้ โปรดระดมการใช้งานแอปพลิเคชัน"
      },
      {
        title: "2. บัญชีผู้ใช้และความปลอดภัย",
        list: [
          "คุณต้องให้ข้อมูลที่ถูกต้องและเป็นปัจจุบันเมื่อลงทะเบียนบัญชี",
          "คุณมีหน้าที่รับผิดชอบแต่เพียงผู้เดียวในการรักษาความลับของรหัสผ่านหรือข้อมูลการเข้าถึงบัญชีของคุณ"
        ]
      },
      {
        title: "3. การใช้งานที่ได้รับอนุญาต",
        list: [
          "คุณตกลงที่จะใช้แอปพลิเคชันของเราในลักษณะที่ชอบด้วยกฎหมายและไม่ละเมิดสิทธิของผู้อื่น",
          "คุณไม่สามารถคัดลอก ทำซ้ำ หรือแก้ไขเนื้อหาภายในแอปโดยไม่ได้รับอนุญาตล่วงหน้า"
        ]
      },
      {
        title: "4. การระงับและการยกเลิกบัญชี",
        content: "เราขอสงวนสิทธิ์ในการระงับหรือยกเลิกการเข้าถึงแอปพลิเคชันของคุณทันทีหากคุณละเมิดข้อกำหนดการใช้งานเหล่านี้"
      },
      {
        title: "5. ข้อจำกัดความรับผิด",
        content: "เราจะไม่รับผิดชอบต่อความเสียหายโดยตรงหรือโดยอ้อมที่เกิดจากการใช้งานหรือการไม่สามารถใช้งานแอปพลิเคชันได้"
      },
      {
        title: "6. การแก้ไขข้อกำหนด",
        content: "บริษัทขอสงวนสิทธิ์ในการแก้ไขหรืออัปเดตข้อกำหนดเหล่านี้ได้ทุกเมื่อ การใช้งานแอปพลิเคชันต่อไปของคุณหลังจากการเปลี่ยนแปลงใดๆ จะถือว่าคุณยอมรับข้อกำหนดที่ได้รับแก้ไขแล้ว"
      },
      {
        title: "7. กฎหมายที่ใช้บังคับ",
        content: "ข้อกำหนดการใช้งานเหล่านี้อยู่ภายใต้บังคับและตีความตามกฎหมายของราชอาณาจักรไทย"
      }
    ]
  },
  EN: {
    title: "Terms of Service",
    effectiveDate: "Effective Date: September 19, 2024",
    intro: "These Terms of Service govern your use of the minchap application. Please read and understand them before you begin using the application.",
    sections: [
      {
        title: "1. Acceptance of Terms",
        content: "By accessing and using the minchap application, you agree to and accept these Terms of Service. If you do not agree to these terms, please refrain from using the application."
      },
      {
        title: "2. User Account and Security",
        list: [
          "You must provide accurate and up-to-date information when registering an account.",
          "You are solely responsible for maintaining the confidentiality of your password or account access information."
        ]
      },
      {
        title: "3. Permitted Use",
        list: [
          "You agree to use our application in a lawful manner and not infringe upon the rights of others.",
          "You may not copy, reproduce, or modify the content within the app without prior permission."
        ]
      },
      {
        title: "4. Account Suspension and Termination",
        content: "We reserve the right to immediately suspend or terminate your access to the application if you violate these Terms of Service."
      },
      {
        title: "5. Limitation of Liability",
        content: "We shall not be liable for any direct or indirect damages arising from the use or inability to use the application."
      },
      {
        title: "6. Modification of Terms",
        content: "The company reserves the right to amend or update these terms at any time. Your continued use of the application after any changes will constitute your acceptance of the revised terms."
      },
      {
        title: "7. Governing Law",
        content: "These Terms of Service are governed by and construed in accordance with the laws of the Kingdom of Thailand."
      }
    ]
  },
  JP: {
    title: "利用規約",
    effectiveDate: "発効日: 2024年9月19日",
    intro: "この利用規約は、minchap アプリケーションの使用に適用されます。アプリケーションの使用を開始する前に、これらを読んで理解してください。",
    sections: [
      {
        title: "1. 規約の承諾",
        content: "minchap アプリケーションにアクセスして使用することにより、これらの利用規約に同意し、承諾したものとみなされます。これらの規約に同意しない場合は、アプリケーションの使用を控えてください。"
      },
      {
        title: "2. ユーザーアカウントとセキュリティ",
        list: [
          "アカウントを登録する際は、正確かつ最新の情報を提供する必要があります。",
          "パスワードまたはアカウントアクセス情報の機密性を維持することは、お客様独自の責任です。"
        ]
      },
      {
        title: "3. 許可された使用",
        list: [
          "お客様は、当社のアプリケーションを合法的な方法で使用し、他人の権利を侵害しないことに同意します。",
          "事前の許可なく、アプリ内のコンテンツをコピー、複製、または変更することはできません。"
        ]
      },
      {
        title: "4. アカウントの停止および終了",
        content: "これらの利用規約に違反した場合、当社はアプリケーションへのアクセスを直ちに停止または終了する権利を留保します。"
      },
      {
        title: "5. 責任の制限",
        content: "アプリケーションの使用または使用不能から生じる直接的または間接的な損害について、当社は責任を負いません。"
      },
      {
        title: "6. 規約の変更",
        content: "当社は、いつでもこれらの規約を修正または更新する権利を留保します。変更後も引き続きアプリケーションを使用することで、修正された規約に同意したものとみなされます。"
      },
      {
        title: "7. 準拠法",
        content: "これらの利用規約は、タイ王国の法律に従って管理および解釈されます。"
      }
    ]
  },
  CN: {
    title: "使用条款",
    effectiveDate: "生效日期：2024年9月19日",
    intro: "这些使用条款约束您对 minchap 应用程序的使用。在开始使用应用程序之前，请阅读并理解这些条款。",
    sections: [
      {
        title: "1. 接受条款",
        content: "访问并使用 minchap 应用程序，即表示您同意并接受这些使用条款。如果您不同意这些条款，请停止使用该应用程序。"
      },
      {
        title: "2. 用户账户与安全",
        list: [
          "注册账户时，您必须提供准确且最新的信息。",
          "您全权负责维护您的密码或账户访问信息的机密性。"
        ]
      },
      {
        title: "3. 许可使用",
        list: [
          "您同意以合法方式使用我们的应用程序，且不侵犯他人的权利。",
          "未经事先许可，您不得复制、再造或修改应用程序中的内容。"
        ]
      },
      {
        title: "4. 账户暂停与终止",
        content: "如果您违反这些使用条款，我们保留立即暂停或终止您访问应用程序的权利。"
      },
      {
        title: "5. 责任限制",
        content: "对于因使用或无法使用应用程序而产生的任何直接或间接损害，我们概不负责。"
      },
      {
        title: "6. 条款修改",
        content: "公司保留随时修改或更新这些条款的权利。在任何变更后继续使用该应用程序即表示您接受修订后的条款。"
      },
      {
        title: "7. 适用法律",
        content: "这些使用条款受泰王国法律管辖并按其解释。"
      }
    ]
  }
};

export default function AppTerms() {
  const { t, language } = useLanguage();
  const content = termsContent[language] || termsContent.TH;

  return (
    <div className="flex flex-col w-full min-h-screen bg-black text-white px-6 pt-6 pb-8 overflow-y-auto no-scrollbar">
      
      <div className="mb-8">
        <Link href="/app/profile" className="mb-6 inline-block text-sm text-[#BF8EFF] hover:text-white transition-colors flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          {t("profile")}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{content.title}</h1>
        <p className="text-xs text-white/40 italic">{content.effectiveDate}</p>
      </div>

      <div className="space-y-8 text-white/70 leading-relaxed font-light text-sm font-sans">
        <p>{content.intro}</p>

        {content.sections.map((section, idx) => (
          <section key={idx}>
            <h2 className="text-lg font-semibold text-white mb-2 tracking-wide">{section.title}</h2>
            {section.content && <p>{section.content}</p>}
            {section.list && (
              <ul className="list-disc pl-5 space-y-2 font-light">
                {section.list.map((item, lIdx) => (
                  <li key={lIdx}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
