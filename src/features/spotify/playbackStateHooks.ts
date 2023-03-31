import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import { makeSpotifyApiFetchOptions, SPOTIFY_API_BASE_URL } from "./api";
import { useSpotifyAuth } from "./authState";

export type SpotifyApiGetPlaybackStateResponse = {
	device: {
		id: string;
		name: string;
	};
	context: {
		type: "artist" | "playlist" | "albam" | "show";
		href: string;
		uri: string;
	};
	item: {
		name: string;
		uri: string;
		album: {
			images: {
				url: string;
				height: number;
				width: number;
			}[];
		};
	};
	progress_ms: number;
	is_playing: boolean;
};

export const usePlaybackState = () => {
	const [authState] = useSpotifyAuth();

	const { data, isLoading, error, mutate } = useSWR(
		authState?.accessToken ? makeKey({
			token: authState.accessToken,
			market: "JP",
			additional_types: "track",
		}) : null,
		fetcher,
		{
			refreshInterval: 5 * 1000,
		},
	);

	const revalidate = useCallback(() => mutate(), [mutate]);

	return {
		data,
		isLoading,
		error,
		revalidate,
	};
};

export const useRevalidatePlaybackState = () => {
	const [authState] = useSpotifyAuth();

	const { mutate } = useSWRConfig();

	const revalidate = useCallback(() => {
		if (!authState?.accessToken) {
			return;
		}

		return mutate(
			makeKey({
				token: authState.accessToken,
				market: "JP",
				additional_types: "track",
			}),
		);
	}, [authState?.accessToken, mutate]);

	return revalidate;
};

const makeKey = (
	props: {
		market: string;
		additional_types: string;
		token: string;
	},
) => {
	return {
		...props,
		key: "v1/me/player",
	};
};

const fetcher = async (
	{ key, market, additional_types, token }: ReturnType<typeof makeKey>,
) => {
	const fetchOptions = makeSpotifyApiFetchOptions(token);

	const res = await fetch(
		`${SPOTIFY_API_BASE_URL}/${key}?${
			new URLSearchParams({
				market,
				additional_types,
			})
		}`,
		fetchOptions,
	);

	const body: SpotifyApiGetPlaybackStateResponse = await res.json();

	return body;
};
