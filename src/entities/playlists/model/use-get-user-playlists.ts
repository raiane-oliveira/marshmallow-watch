import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPlaylists } from "../api/get-user-playlists";
import { Locale } from "@/shared/i18n";

interface UseGetUserPlaylistsProps {
	username: string;
	accessToken?: string | null;
	locale: Locale;
}

export function useGetUserPlaylists({
	username,
	accessToken,
	locale,
}: UseGetUserPlaylistsProps) {
	const query = useInfiniteQuery({
		queryKey: [username, "playlists"],
		queryFn: async ({ pageParam }) => {
			const data = await getUserPlaylists({
				username,
				accessToken,
				page: pageParam,
				locale,
			});
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, _allPages, lastPageParam) => {
			if (lastPage.playlists.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
			if (firstPageParam <= 1) {
				return undefined;
			}
			return firstPageParam - 1;
		},
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		retry: false,
	});

	return query;
}
