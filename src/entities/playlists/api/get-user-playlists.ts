import { api, ApiErrorResponse, Playlist } from "@/shared/api";
import { Locale } from "@/shared/i18n";
import { ApiRequestError } from "@/shared/lib";

interface GetUserPlaylistsProps {
	username: string;
	accessToken?: string | null;
	page: number;
	locale: Locale;
}

export interface GetUserPlaylistsResponse {
	playlists: Playlist[];
	defaultPlaylists: Playlist[];
}

export async function getUserPlaylists({
	username,
	accessToken,
	page,
	locale,
}: GetUserPlaylistsProps): Promise<GetUserPlaylistsResponse> {
	const response = await api.get(
		`/users/${username}/playlists?page=${page}&lang=${locale}`,
		accessToken
			? {
					Authorization: `Bearer ${accessToken}`,
				}
			: undefined,
	);

	if (response.status !== 200) {
		const err = response.data as ApiErrorResponse;
		throw new ApiRequestError({
			status: response.status,
			message: err.message,
		});
	}

	const { playlists, defaultPlaylists } =
		response.data as GetUserPlaylistsResponse;

	return {
		playlists,
		defaultPlaylists,
	};
}
