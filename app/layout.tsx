import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { DEFAULT_TITLE, DESCRIPTION, siteOrigin } from "@/lib/seo";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const skyScript = `(function(){var h=new Date().getHours();document.documentElement.dataset.sky=h>=6&&h<18?"day":"night"})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  applicationName: "sleeptimer",
  title: {
    default: DEFAULT_TITLE,
    template: "%s",
  },
  description: DESCRIPTION,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07080d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-sky="night"
      suppressHydrationWarning
      className={`${outfit.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: skyScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
