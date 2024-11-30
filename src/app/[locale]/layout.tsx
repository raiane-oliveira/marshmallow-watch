import "../styles/globals.css";
import "@/shared/config/dayjs";

import type { Metadata } from "next";
import { Locale, redirect, routing } from "@/shared/i18n";
import { nunitoSans, poppins, queryClient } from "@/shared/config";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/shared/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CurrentUserStoreProvider } from "../providers";

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
	params: { locale },
}: Readonly<{
	children: React.ReactNode;
	params: { locale: Locale };
}>) {
	if (!routing.locales.includes(locale as any)) {
		return redirect("/");
	}

	const messages = await getMessages();

	return (
		<html
			lang={locale}
			className={`${nunitoSans.variable} ${poppins.variable}`}
		>
			<body className="font-nunito-sans antialiased text-zinc-700">
				<NextIntlClientProvider messages={messages}>
					<QueryClientProvider client={queryClient}>
						<CurrentUserStoreProvider>{children}</CurrentUserStoreProvider>

						<ReactQueryDevtools />
					</QueryClientProvider>

					<Toaster />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
