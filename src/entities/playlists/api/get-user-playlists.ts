import { api, Playlist } from "@/shared/api";

interface GetUserPlaylistsProps {
	username: string;
	accessToken?: string;
}

export async function getUserPlaylists({
	username,
	accessToken,
}: GetUserPlaylistsProps): Promise<Playlist[]> {
	const response = await api.get<{ playlists: Playlist[] }>(
		`/users/${username}/playlists`,
		accessToken
			? {
					Authorization: `Bearer ${accessToken}`,
				}
			: undefined,
	);

	const { playlists } = response.data;
	return playlists;
}
