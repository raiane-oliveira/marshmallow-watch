import { api, Genre } from "@/shared/api";
import { Locale } from "@/shared/i18n";
import { useQuery } from "@tanstack/react-query";

export function useGetShowGenres(locale: Locale) {
  const query = useQuery({
    queryKey: ['genres', locale],
    queryFn: async () => {
      const res = await api.get<{ genres: Genre[] }>(`/genres/show?lang=${locale}`)
      return res.data
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  return query
}
