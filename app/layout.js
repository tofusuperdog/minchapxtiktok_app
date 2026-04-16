import "./globals.css";

export const metadata = {
  title: "Hello world",
  description: "A simple Next.js hello world page"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
