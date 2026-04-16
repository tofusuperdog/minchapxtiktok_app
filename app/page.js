import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#11154D] to-[#291337] px-6">

      {/* Central Content */}
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center">
        {/* MinChap Logo */}
        <img
          src="/minchap.svg"
          alt="MinChap"
          className="mb-2 w-[280px] sm:w-[450px]"
        />

        {/* Separator with Text */}
        <div className="mb-2 flex w-full items-center">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="px-4 text-[13px] font-light text-white/70 tracking-wide">Coming Soon on</span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>

        {/* TikTok Logo */}
        <img
          src="/tiktok.svg"
          alt="TikTok"
          className="w-[180px] sm:w-[360px]"
        />

        {/* Demo Button */}
        <Link 
          href="/app"
          className="mt-8 md:mt-12 rounded-full bg-white/10 px-8 py-3 text-[15px] font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 border border-white/20 shadow-lg"
        >
          ทดลองระบบ
        </Link>
      </div>

      {/* Footer */}
      <footer className="flex w-full flex-col items-center justify-center space-y-1.5 pb-8 pt-4 text-center text-[12px] font-light text-white/50">
        <p>Developed by Love Drama Co.,ltd</p>
        <div className="flex items-center gap-2">
          <Link href="/terms-of-service" className="underline underline-offset-2 transition-colors hover:text-white/80">Terms of Service</Link>
          <span>|</span>
          <Link href="/privacy-policy" className="underline underline-offset-2 transition-colors hover:text-white/80">Privacy Policy</Link>
        </div>
      </footer>

    </main>
  );
}
