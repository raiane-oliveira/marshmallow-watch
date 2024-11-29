import { PlaylistCard } from "@/entities/playlists";
import { Playlist } from "@/shared/api";
import { userDefaultLists } from "@/shared/model";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/shared/ui";
import { useLocale, useTranslations } from "next-intl";

interface MediasListProps {
	playlists: Playlist[];
}

export function PlaylistsList({
	playlists: originalPlaylists,
}: MediasListProps) {
	const locale = useLocale();
	const dict = useTranslations("Shared.userLists");

	const playlists = [...originalPlaylists].sort((a) => {
		if (Object.keys(userDefaultLists).includes(a.name)) {
			return 1;
		}

		return -1;
	});

	return (
		<Carousel
			opts={{
				dragFree: true,
				loop: true,
				align: "start",
			}}
		>
			<CarouselContent className="ml-0 w-full">
				{playlists?.map((playlist, index) => {
					const defaultPlaylistName = playlist.isDefault
						? dict(playlist.name as "willWatch" | "watched" | "watching")
						: "";

					return (
						<CarouselItem
							key={playlist.id}
							className="min-w-[230px] basis-[16dvw]"
						>
							<PlaylistCard
								locale={locale}
								playlist={playlist}
								image={{
									loading: index < 5 ? "eager" : "lazy",
								}}
								defaultPlaylistName={defaultPlaylistName}
							/>
						</CarouselItem>
					);
				})}
			</CarouselContent>

			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
