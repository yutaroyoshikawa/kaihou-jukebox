import useSWR from "swr";
import { makeSpotifyApiFetchOptions, SPOTIFY_API_BASE_URL } from "./api";
import { useSpotifyAuth } from "./authState";
import { useMyProfile } from "./user";

type Playlist = {
	id: string;
	name: string;
	images: {
		url: string;
		width: number;
		height: number;
	}[];
};

type GetMyPlaylistResponse = {
	items: Playlist[];
};

export const useMyPlaylists = () => {
	const [authState] = useSpotifyAuth();
	const mySelf = useMyProfile();

	const { data, isLoading, error } = useSWR(
		authState?.accessToken && mySelf.data
			? makeKey({
					token: authState.accessToken,
					userId: mySelf.data.id,
					limit: 50,
					offset: 0,
			  })
			: null,
		fetcher,
	);

	return {
		data,
		isLoading,
		error,
	};
};

const makeKey = (props: {
	token: string;
	userId: string;
	limit: number;
	offset: number;
}) => {
	return {
		...props,
		key: `v1/users/${props.userId}/playlists`,
	};
};

const fetcher = async ({
	key,
	token,
	userId,
	limit,
	offset,
}: ReturnType<typeof makeKey>) => {
	const fetchOptions = makeSpotifyApiFetchOptions(token);

	const res = await fetch(
		`${SPOTIFY_API_BASE_URL}/${key}?${new URLSearchParams({
			user_id: userId,
			limit: limit.toString(),
			offset: offset.toString(),
		})}`,
		fetchOptions,
	);

	const body: GetMyPlaylistResponse = await res.json();

	return body;
};
