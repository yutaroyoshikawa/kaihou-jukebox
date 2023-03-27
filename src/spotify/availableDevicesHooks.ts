import { useMemo } from "react";
import useSWR from "swr";
import {
	handleApiError,
	makeSpotifyApiFetchOptions,
	SPOTIFY_API_BASE_URL,
} from "./api";
import { useSpotifyPlayer } from "./playerHooks";

type AvailableDevice = {
	id: string;
	is_active: boolean;
	is_private_session: boolean;
	is_restricted: boolean;
	name: string;
	type: "computer" | "smartphone" | "speaker";
	volume_percent: number;
};

type GetAvailableDevicesResponse = {
	devices: AvailableDevice[];
};

export const useAvailableDevices = () => {
	const player = useSpotifyPlayer();

	const token = useMemo(() => {
		if (!player) {
			return;
		}

		let token: string | undefined = undefined;

		player._options.getOAuthToken((cb) => {
			token = cb;
		});

		return token;
	}, [player]);

	const { data, isLoading, error } = useSWR(
		token ? makeKey({ token }) : null,
		fetcher,
	);

	return {
		data,
		isLoading,
		error,
	};
};

const makeKey = (props: { token: string }) => {
	return {
		...props,
		key: "v1/me/player/devices",
	};
};

const fetcher = async ({ key, token }: ReturnType<typeof makeKey>) => {
	const fetchOptions = makeSpotifyApiFetchOptions(token);

	const res = await fetch(`${SPOTIFY_API_BASE_URL}/${key}`, fetchOptions);

	const body: GetAvailableDevicesResponse = await res.json().catch(
		handleApiError,
	);

	return body;
};
