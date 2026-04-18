"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MagicTrail from "./MagicTrail";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDemoClick = () => {
    // Check for mobile (simple width check)
    if (window.innerWidth < 640) {
      router.push("/app");
    } else {
      setIsDesktopModalOpen(true);
    }
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (password === "lovelove") {
      router.push("/app");
    } else {
      setError("รหัสผ่านไม่ถูกต้อง");
      setPassword("");
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#11154D] to-[#291337] px-6">

      {/* Central Content */}
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center">
        {/* MinChap Logo */}
        <img
          src="/minchap.svg"
          alt="MinChap"
          className="mb-2 w-[280px] sm:w-[550px]"
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
        <button
          onClick={handleDemoClick}
          className="mt-8 md:mt-12 rounded-full bg-white/10 px-10 py-4 text-[16px] font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          ทดลองระบบ
        </button>
      </div>

      {/* Footer */}
      <footer className="flex w-full flex-col items-center justify-center space-y-1.5 pb-8 pt-4 text-center text-[12px] font-light text-white/50">
        <p>Developed by Love Drama Co.,ltd</p>
      </footer>

      {/* Desktop Guard Modal */}
      {isDesktopModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          onClick={() => setIsDesktopModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-[450px] overflow-hidden rounded-[40px] border border-white/20 bg-[#1a1a2e]/60 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] text-center p-10 transform transition-all animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
             {/* Sparkles/Glow */}
             <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-purple-500/20 blur-[60px]"></div>
             <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-blue-500/20 blur-[60px]"></div>

             <img src="/shockgirl.svg" alt="Shock!" className="w-48 h-48 mx-auto mb-6 object-contain animate-subtle-bounce" />
             
             <h2 className="text-2xl font-bold text-white mb-4">โอ๊ะโอ! จอใหญ่จังเลย~ 😲</h2>
             <p className="text-[15px] font-light text-white/80 leading-relaxed mb-8">
               เราตั้งใจออกแบบแอปนี้มาเพื่อน้อง <span className="text-[#BF8EFF] font-semibold">Mobile</span> โดยเฉพาะเลยนะค้าาา ลองย่อหน้าจอให้ผอมๆ หรือสแกนเล่นผ่านมือถือเพื่อความฟินระดับสุดนะคะ! 💕
             </p>

             <button 
               onClick={() => setIsDesktopModalOpen(false)}
               className="w-full rounded-2xl bg-gradient-to-r from-[#BF8EFF] to-[#a36dfc] py-4 text-white font-bold shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
             >
               รับทราบค่าาา~
             </button>
          </div>
        </div>
      )}

      {/* Password Modal (Retained just in case, though skipped for now) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6 transition-all"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-[340px] overflow-hidden rounded-[32px] border border-white/10 p-1 bg-[#1a1a2e]/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#BF8EFF]/20 blur-[60px]"></div>
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#BF8EFF]/10 blur-[60px]"></div>

            <div className="relative p-8">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-white mb-2">ยินดีต้อนรับ</h2>
                    <p className="text-sm font-light text-white/60">กรุณาใส่รหัสผ่านเพื่อเข้าสู่ระบบทดลอง</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="group relative">
                    <input
                      autoFocus
                      type="password"
                      placeholder="รหัสผ่าน"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className={`w-full rounded-2xl bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} px-5 py-4 text-center text-lg text-white placeholder-white/20 outline-none focus:border-[#BF8EFF]/50 focus:bg-white/[0.08] transition-all duration-300`}
                    />
                    {error && (
                      <p className="mt-2 text-center text-[13px] font-medium text-red-400 animate-pulse">{error}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-gradient-to-r from-[#BF8EFF] to-[#a36dfc] py-4 text-[16px] font-semibold text-white shadow-[0_8px_20px_rgba(191,142,255,0.3)] hover:shadow-[0_12px_25px_rgba(191,142,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all duration-300"
                    >
                      เข้าสู่ระบบ
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setPassword("");
                        setError("");
                      }}
                      className="w-full rounded-2xl bg-white/5 py-4 text-[15px] font-medium text-white/40 hover:text-white/70 hover:bg-white/10 transition-all duration-300"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      )}
      <MagicTrail />

      <style jsx global>{`
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-in {
          animation: zoomIn 0.3s ease-out forwards;
        }
        .animate-subtle-bounce {
          animation: subtleBounce 2s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
