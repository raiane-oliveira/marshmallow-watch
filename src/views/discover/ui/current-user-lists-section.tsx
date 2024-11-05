"use client";

import { useCurrentUserStore } from "@/entities/user";
import { PlaylistsList } from "@/widgets/app";
import { useTranslations } from "next-intl";

export function CurrentUserListsSection() {
	const dict = useTranslations("App.HomePage");
	const user = useCurrentUserStore((state) => state.user);
	const accessToken = useCurrentUserStore((state) => state.accessToken);

	if (!accessToken) return null;
	if (!user) return null;

	return (
		<section className="flex flex-col w-full gap-2.5">
			<h4 className="font-bold block pl-8 text-xl-viewport/normal text-zinc-700">
				{dict("content.lists.userLists")}
			</h4>

			<PlaylistsList playlists={user.playlists} />
		</section>
	);
}
