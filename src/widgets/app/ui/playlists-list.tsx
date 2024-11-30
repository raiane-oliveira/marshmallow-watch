import { PlaylistCard } from "@/entities/playlists";
import { Playlist } from "@/shared/api";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/shared/ui";
import { useLocale, useTranslations } from "next-intl";

interface MediasListProps {
	defaultPlaylists: Playlist[];
	playlists: Playlist[];
}

export function PlaylistsList({
	defaultPlaylists,
	playlists,
}: MediasListProps) {
	const locale = useLocale();
	const dict = useTranslations("Shared.userLists");

	return (
		<Carousel
			opts={{
				dragFree: true,
				loop: true,
				align: "start",
			}}
		>
			<CarouselContent className="ml-0 w-full">
				{playlists.map((playlist, index) => {
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
							/>
						</CarouselItem>
					);
				})}

				{defaultPlaylists.map((playlist) => {
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
