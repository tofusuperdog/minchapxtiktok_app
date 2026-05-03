import { IBM_Plex_Sans_Thai } from "next/font/google";
import "@byteplus/veplayer/index.min.css";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
});

export const metadata = {
  title: "MinChap - TikTok style short series",
  description: "Experience the best short series in a TikTok-style feed on MinChap.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ibmPlexSansThai.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
