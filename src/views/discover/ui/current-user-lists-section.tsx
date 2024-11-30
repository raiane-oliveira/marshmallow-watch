"use client";

import { useGetUserPlaylists } from "@/entities/playlists";
import { useCurrentUserStore } from "@/entities/user";
import { MediasListSkeleton, PlaylistsList } from "@/widgets/app";
import { useLocale, useTranslations } from "next-intl";

export function CurrentUserListsSection() {
  const locale = useLocale()
	const dict = useTranslations("App.HomePage");
	const user = useCurrentUserStore((state) => state.user);
	const accessToken = useCurrentUserStore((state) => state.accessToken);

	const { data, isLoading, isError } = useGetUserPlaylists({
		username: user?.username ?? "",
		accessToken,
    locale,
	});

	if (!accessToken) return null;
	if (!user) return null;

	if (isError) {
		return null;
	}

	const playlistsData = !data
		? { playlists: [], defaultPlaylists: [] }
		: data.pages[0];

	return (
		<section className="flex flex-col w-full gap-2.5">
			<h4 className="font-bold block pl-8 text-xl-viewport/normal text-zinc-700">
				{dict("content.lists.userLists")}
			</h4>

			{isLoading ? (
				<MediasListSkeleton />
			) : (
				<PlaylistsList
					playlists={playlistsData.playlists}
					defaultPlaylists={playlistsData.defaultPlaylists}
				/>
			)}
		</section>
	);
}
