import "../styles/globals.css";

import type { Metadata } from "next";
import { i18n } from "@/shared/i18n";
import { nunitoSans, poppins } from "@/shared/config";

export const metadata: Metadata = {
  title: "Marshmallow Watch",
  description:
    "Explore exclusive trailers, create personalized lists, and more with Marshmallow Watch. Transform your entertainment discovery experience today!",
  authors: [
    { name: "Raiane Oliveira", url: "https://github.com/raiane-oliveira" },
  ],
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html
      lang={params.lang}
      className={`${nunitoSans.variable} ${poppins.variable}`}
    >
      <body className="font-nunito-sans">{children}</body>
    </html>
  );
}
