"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
        <button
          onClick={() => setIsOpen(true)}
          className="mt-8 md:mt-12 rounded-full bg-white/10 px-8 py-3 text-[15px] font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 border border-white/20 shadow-lg"
        >
          ทดลองระบบ
        </button>
      </div>

      {/* Footer */}
      <footer className="flex w-full flex-col items-center justify-center space-y-1.5 pb-8 pt-4 text-center text-[12px] font-light text-white/50">
        <p>Developed by Love Drama Co.,ltd</p>
      </footer>

      {/* Password Modal */}
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
    </main>
  );
}
