import { Locale } from "@/shared/i18n";
import { UserListsPage } from "@/views/user-lists";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
	const dict = await getTranslations("App.MyListsPage.Metadata");

	return {
		title: dict("title"),
	};
}

interface PageProps {
	params: {
		locale: Locale;
		username: string;
	};
}

export default function Page({ params }: PageProps) {
	return <UserListsPage locale={params.locale} username={params.username} />;
}
