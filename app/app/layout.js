import AppLayoutClient from "./AppLayoutClient";

export const metadata = {
  title: "MinChap App",
  description: "MinChap App Mobile Architecture",
};

export default function AppLayout({ children }) {
  return <AppLayoutClient>{children}</AppLayoutClient>;
}
