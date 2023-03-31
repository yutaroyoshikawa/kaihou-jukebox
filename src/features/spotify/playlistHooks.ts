import useSWR from "swr";
import { makeSpotifyApiFetchOptions, SPOTIFY_API_BASE_URL } from "./api";
import { useSpotifyAuth } from "./authState";
import { useMyProfile } from "./user";

export type Playlist = {
	track: {
		id: string;
		name: string;
		album: {
			id: string;
			images: {
				url: string;
				height: number;
				width: number;
			}[];
		};
	};
};

type GetPlaylistResponse = {
	tracks: {
		items: Playlist[];
	};
	images: {
		url: string;
		height: number;
		width: number;
	}[];
};

export const usePlaylist = (playlistId: string) => {
	const [authState] = useSpotifyAuth();
	const mySelf = useMyProfile();

	const { data, isLoading, error } = useSWR(
		authState?.accessToken && mySelf.data
			? makeKey({
					token: authState.accessToken,
					playlist_id: playlistId,
					market: "JP",
					fields: "fields=tracks.items(track(id,name,album(id,name)))",
					additional_types: "track",
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
	playlist_id: string;
	market: string;
	fields: string;
	additional_types: string;
}) => {
	return {
		...props,
		key: `v1/playlists/${props.playlist_id}`,
	};
};

const fetcher = async ({
	key,
	token,
	market,
	fields,
	additional_types,
}: ReturnType<typeof makeKey>) => {
	const fetchOptions = makeSpotifyApiFetchOptions(token);

	const res = await fetch(
		`${SPOTIFY_API_BASE_URL}/${key}?${new URLSearchParams({
			market,
			fields,
			additional_types,
		})}`,
		fetchOptions,
	);

	const body: GetPlaylistResponse = await res.json();

	return body;
};
