"use client";

import { useLanguage } from "../LanguageContext";
import Link from "next/link";

const policyContent = {
  TH: {
    title: "นโยบายความเป็นส่วนตัว",
    effectiveDate: "เริ่มมีผลบังคับใช้: 19 กันยายน 2567",
    intro: "แอป minchap เคารพความเป็นส่วนตัวของผู้ใช้ เรามุ่งมั่นที่จะรักษาความปลอดภัยและปกป้องข้อมูลส่วนบุคคลของคุณ นโยบายความเป็นส่วนตัวนี้อธิบายวิธีที่เราเก็บรวบรวม ใช้ และปกป้องข้อมูลของคุณ",
    sections: [
      {
        title: "1. การเก็บรวบรวมข้อมูลส่วนบุคคล",
        content: "เราจะเก็บรวบรวมข้อมูลส่วนบุคคลที่จำเป็นสำหรับการใช้งานแอป เช่น:",
        list: [
          "รายละเอียดส่วนบุคคล: ชื่อ, อีเมล",
          "ข้อมูลการชำระเงิน: สำหรับการซื้อเนื้อหาภายในแอป รายละเอียดบัตรเครดิตหรือช่องทางการชำระเงินจะถูกเก็บรวบรวมอย่างปลอดภัยผ่านผู้ให้บริการชำระเงินภายนอก"
        ]
      },
      {
        title: "2. การใช้ข้อมูลส่วนบุคคล",
        content: "ข้อมูลส่วนบุคคลของคุณจะถูกใช้เพื่อวัตถุประสงค์ดังต่อไปนี้:",
        list: [
          "เพื่อให้บริการและปรับปรุงประสบการณ์การใช้งานของคุณภายในแอป",
          "เพื่อดำเนินการและจัดการการชำระเงินสำหรับการซื้อเนื้อหา",
          "เพื่อสื่อสารกับคุณเกี่ยวกับบัญชีของคุณ เนื้อหาที่น่าสนใจ หรือการอัปเดตแอป"
        ]
      },
      {
        title: "3. การแบ่งปันข้อมูล",
        content: "เราจะไม่ขาย แบ่งปัน หรือแลกเปลี่ยนข้อมูลส่วนบุคคลของคุณกับบุคคลที่สาม ยกเว้นในกรณีต่อไปนี้:",
        list: [
          "ด้วยความยินยอมอย่างชัดแจ้งจากคุณ",
          "เมื่อจำเป็นต้องแบ่งปันข้อมูลกับบุคคลที่สามเพื่อให้บริการ เช่น ผู้ให้บริการชำระเงิน",
          "เมื่อกฎหมายกำหนดหรือมีคำสั่งศาลบังคับให้เราเปิดเผยข้อมูล"
        ]
      },
      {
        title: "4. ความปลอดภัยของข้อมูล",
        content: "เราใช้มาตรการทางเทคนิคและระดับองค์กรเพื่อรักษาความปลอดภัยข้อมูลส่วนบุคคลของคุณ เช่น การเข้ารหัสข้อมูลระหว่างการส่งและการจัดเก็บไว้ในระบบที่ปลอดภัย เราจะปฏิบัติตามมาตรฐานที่เหมาะสมเพื่อป้องกันการเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต"
      },
      {
        title: "5. การเก็บรักษาข้อมูล",
        content: "เราจะเก็บรักษาข้อมูลส่วนบุคคลของคุณไว้นานเท่าที่จำเป็นสำหรับวัตถุประสงค์ที่รวบรวมไว้หรือตามที่กฎหมายกำหนด เมื่อข้อมูลของคุณไม่จำเป็นอีกต่อไป เราจะลบหรือทำลายข้อมูลงอย่างปลอดภัย"
      },
      {
        title: "6. สิทธิของผู้ใช้",
        content: "คุณมีสิทธิ์ในการเข้าถึง แก้ไข หรือขอให้ลบข้อมูลส่วนบุคคลของคุณได้ทุกเมื่อ คุณสามารถติดต่อเราเพื่อยื่นคำขอดังกล่าวได้โดยใช้ข้อมูลที่ให้ไว้ในส่วน \"ติดต่อเรา\""
      },
      {
        title: "7. การเปลี่ยนแปลงนโยบายความเป็นส่วนตัว",
        content: "เราขอสงวนสิทธิ์ในการแก้ไขนโยบายความเป็นส่วนตัวนี้ตามความจำเป็น หากมีการเปลี่ยนแปลงนโยบายนี้ เราจะแจ้งให้คุณทราบผ่านแอป"
      },
      {
        title: "8. ติดต่อเรา",
        content: "หากคุณมีคำถามหรือข้อกังวลใดๆ เกี่ยวกับนโยบายความเป็นส่วนตัวนี้ โปรดติดต่อเราที่: support@minchapseries.com"
      }
    ]
  },
  EN: {
    title: "Privacy Policy",
    effectiveDate: "Effective Date: September 19, 2024",
    intro: "The minchap app respects user privacy. We are committed to securing and protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.",
    sections: [
      {
        title: "1. Collection of Personal Information",
        content: "We will collect personal information necessary for using the app, such as:",
        list: [
          "Personal details: Name, Email",
          "Payment information: For purchasing content within the app, credit card or payment gateway details will be securely collected via third-party payment providers."
        ]
      },
      {
        title: "2. Use of Personal Information",
        content: "Your personal information will be used for the following purposes:",
        list: [
          "To provide and improve your user experience within the app.",
          "To process and manage payments for content purchases.",
          "To communicate with you regarding your account, content of interest, or app updates."
        ]
      },
      {
        title: "3. Sharing of Information",
        content: "We will not sell, share, or trade your personal information with third parties, except in the following circumstances:",
        list: [
          "With your explicit consent.",
          "When it is necessary to share information with third parties to provide services, such as payment providers.",
          "When required by law or a court order compelling us to disclose the information."
        ]
      },
      {
        title: "4. Data Security",
        content: "We implement technical and organizational measures to secure your personal information, such as encrypting data during transmission and storing it in secure systems. We will follow appropriate standards to prevent unauthorized access to data."
      },
      {
        title: "5. Data Retention",
        content: "We will retain your personal information for as long as necessary for the purposes for which it was collected or as required by law. Once your information is no longer needed, we will securely delete or destroy it."
      },
      {
        title: "6. User Rights",
        content: "You have the right to access, modify, or request the deletion of your personal information at any time. You may contact us to make such requests using the information provided in the \"Contact Us\" section."
      },
      {
        title: "7. Changes to the Privacy Policy",
        content: "We reserve the right to modify this Privacy Policy as necessary. If there are changes to this policy, we will notify you through the app."
      },
      {
        title: "8. Contact Us",
        content: "If you have any questions or concerns about this Privacy Policy, please contact us at: support@minchapseries.com"
      }
    ]
  },
  JP: {
    title: "プライバシーポリシー",
    effectiveDate: "発効日: 2024年9月19日",
    intro: "minchap アプリはユーザーのプライバシーを尊重します。当社は、お客様の個人情報を保護し、安全に保つことに尽力しています。このプライバシーポリシーでは、当社がお客様のデータを収集、使用、保護する方法について説明します。",
    sections: [
      {
        title: "1. 個人情報の収集",
        content: "アプリを使用するために必要な個人情報を収集します。例:",
        list: [
          "個人情報: 名前、メールアドレス",
          "支払い情報: アプリ内でコンテンツを購入する場合、クレジットカードまたは支払いゲートウェイの詳細は、サードパーティの決済プロバイダーを通じて安全に収集されます。"
        ]
      },
      {
        title: "2. 個人情報の使用",
        content: "お客様の個人情報は、以下の目的で使用されます。",
        list: [
          "アプリ内でのユーザーエクスペリエンスの提供および向上。",
          "コンテンツ購入のための支払いの処理および管理。",
          "アカウント、興味のあるコンテンツ、またはアプリの更新に関するお客様との連絡。"
        ]
      },
      {
        title: "3. 情報の共有",
        content: "以下の場合を除き、お客様の個人情報を第三者に販売、共有、または取引することはありません。",
        list: [
          "お客様の明示的な同意がある場合。",
          "決済プロバイダーなどのサービスを提供するために第三者と情報を共有する必要がある場合。",
          "法律または裁判所の命令により、情報の開示を強制された場合。"
        ]
      },
      {
        title: "4. データセキュリティ",
        content: "当社は、送信中のデータの暗号化や安全なシステムでの保管など、お客様の個人情報を保護するための技術的および組織的な措置を講じています。データへの不正アクセスを防止するために、適切な基準に従います。"
      },
      {
        title: "5. データの保持",
        content: "当社は、収集された目的または法律で義務付けられている期間、お客様の個人情報を保持します。情報の必要がなくなった後は、安全に削除または破棄します。"
      },
      {
        title: "6. ユーザーの権利",
        content: "お客様は、いつでも自分の個人情報へのアクセス、修正、または削除を要求する権利を有します。「お問い合わせ」セクションにある情報を使用して、このような要求を行うことができます。"
      },
      {
        title: "7. プライバシーポリシーの変更",
        content: "当社は、必要に応じてこのプライバシーポリシーを変更する権利を留保します。ポリシーに変更がある場合は、アプリを通じてお知らせします。"
      },
      {
        title: "8. お問い合わせ",
        content: "このプライバシーポリシーに関するご質問や懸念がある場合は、support@minchapseries.com までご連絡ください。"
      }
    ]
  },
  CN: {
    title: "隐私政策",
    effectiveDate: "生效日期：2024年9月19日",
    intro: "minchap 应用程序尊重用户隐私。我们致力于保护您的个人信息。本隐私政策说明了我们如何收集、使用和保护您的数据。",
    sections: [
      {
        title: "1. 个人信息的收集",
        content: "我们将收集使用应用程序所必需的个人信息，例如：",
        list: [
          "个人详情：姓名、电子邮件",
          "付款信息：为了购买应用程序内的内容，信用卡或支付网关详情将通过第三方支付提供商安全收集。"
        ]
      },
      {
        title: "2. 个人信息的使用",
        content: "您的个人信息将用于以下目的：",
        list: [
          "提供并改善您在应用程序内的用户体验。",
          "处理并管理内容购买的付款。",
          "就您的账户、感兴趣的内容或应用程序更新与您联系。"
        ]
      },
      {
        title: "3. 信息共享",
        content: "除以下情况外，我们不会向第三方出售、共享或交易您的个人信息：",
        list: [
          "获得您的明确同意。",
          "为提供服务（如支付提供商）而必须与第三方共享信息时。",
          "法律或法院命令强制要求我们披露信息时。"
        ]
      },
      {
        title: "4. 数据安全",
        content: "我们实施技术和组织措施来保护您的个人信息，例如在传输过程中对数据进行加密并将其存储在安全的系统中。我们将遵循适当的标准来防止对数据的未经授权访问。"
      },
      {
        title: "5. 数据保留",
        content: "我们将在实现收集目的或法律要求的必要期限内保留您的个人信息。一旦不再需要您的信息，我们将安全地删除或销毁它。"
      },
      {
        title: "6. 用户权利",
        content: "您有权随时访问、修改或请求删除您的个人信息。您可以使用“联系我们”部分提供的信息与我们联系并提出此类请求。",
      },
      {
        title: "7. 隐私政策的变更",
        content: "我们保留根据需要修改本隐私政策的权利。如果本政策有变动，我们将通过应用程序通知您。"
      },
      {
        title: "8. 联系我们",
        content: "如果您对本隐私政策有任何问题或疑问，请联系我们：support@minchapseries.com"
      }
    ]
  }
};

export default function AppPolicy() {
  const { t, language } = useLanguage();
  const content = policyContent[language] || policyContent.TH;

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
            {section.content && <p className="mb-2">{section.content}</p>}
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
