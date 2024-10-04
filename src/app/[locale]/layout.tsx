import "../styles/globals.css";

import type { Metadata } from "next";
import { Locale } from "@/shared/i18n";
import { nunitoSans, poppins } from "@/shared/config";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/shared/ui";

export const metadata: Metadata = {
  title: {
    default: "Marshmallow Watch",
    template: "%s | Marshmallow Watch",
  },
  description:
    "Explore exclusive trailers, create personalized lists, and more with Marshmallow Watch. Transform your entertainment discovery experience today!",
  authors: [
    { name: "Raiane Oliveira", url: "https://github.com/raiane-oliveira" },
  ],
};

// export async function generateStaticParams() {
//   return routing.locales.map((locale) => ({ lang: locale }));
// }

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  const messages = await getMessages();

  return (
    <html
      lang={params.locale}
      className={`${nunitoSans.variable} ${poppins.variable}`}
    >
      <body className="font-nunito-sans antialiased text-zinc-700">
        <NextIntlClientProvider messages={messages}>
          {children}

          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
