import { Locale } from "@/shared/i18n";
import { NotAllowedError } from "@/shared/lib";
import { getAuth } from "@/shared/model";
import { useQuery } from "@tanstack/react-query";
import { getUserPlaylists } from "../api/get-user-playlists";

interface UseGetUserPlaylistsProps {
	username: string;
	locale: Locale;
}

export function useGetUserPlaylists({
	username,
	locale,
}: UseGetUserPlaylistsProps) {
	const { accessToken } = getAuth();

	const query = useQuery({
		queryKey: [username, "playlists"],
		queryFn: async () => {
			if (!accessToken) {
				throw NotAllowedError.create(locale);
			}

			const playlists = await getUserPlaylists({ username, accessToken });
			return playlists;
		},
	});

	return query;
}
