import { api, Playlist } from "@/shared/api";
import { Locale } from "@/shared/i18n";
import { NotAllowedError } from "@/shared/lib";
import { getAuth } from "@/shared/model";
import { useQuery } from "@tanstack/react-query";

interface UseGetUserPlaylistsProps {
  username: string
  locale: Locale
}

export function useGetUserPlaylists({username, locale}: UseGetUserPlaylistsProps) {
  const {accessToken} = getAuth()

  const query = useQuery({
    queryKey: [username, "playlists"],
    queryFn: async () => {
      if (!accessToken) {
        throw NotAllowedError.create(locale)
      }

      const response = await api.get<{playlists: Playlist[]}>(`/users/${username}/playlists`, {
        Authorization: `Bearer ${accessToken}`
      })

      const { playlists } = response.data
      return playlists
    }
  })

  return query
}
