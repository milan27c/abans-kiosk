import type { Metadata, Viewport } from "next";
import "./globals.css";
import KioskFrame from "./components/kiosk-frame";

export const metadata: Metadata = {
  title: "Abans E-Catalog",
  description: "Browse the Abans product catalogue and request a spec sheet.",
};

export const viewport: Viewport = {
  width: 1080,
  initialScale: 1,
  themeColor: "#781E7D",
};

// Set the theme class before first paint to avoid a light/dark flash.
const themeInit = `
(function () {
  try {
    var stored = localStorage.getItem("abans-theme");
    var dark = stored ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full">
        <KioskFrame>{children}</KioskFrame>
      </body>
    </html>
  );
}
