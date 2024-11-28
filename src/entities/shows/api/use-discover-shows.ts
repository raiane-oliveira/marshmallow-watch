import {
	api,
	TvShow,
} from "@/shared/api";
import { Locale } from "@/shared/i18n";
import { useInfiniteQuery } from "@tanstack/react-query";

interface DiscoverShowsProps {
  locale: Locale
  genreIds: string[]
}

export function useDiscoverShows({ locale = "en", genreIds }: DiscoverShowsProps) {
	const query = useInfiniteQuery({
		queryKey: ["tv-shows", ...genreIds],
		queryFn: async ({ pageParam }) => {
			const response = await api.get<{ tvShows: TvShow[] }>(`/discover/tv-shows?lang=${locale}&genreIds=${genreIds.join(",")}&page=${pageParam}`);

			return response.data.tvShows;
		},
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - 1
    },
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});
	return query;
}

