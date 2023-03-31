import useSWR from "swr";
import {
	handleApiError,
	makeSpotifyApiFetchOptions,
	SPOTIFY_API_BASE_URL,
} from "./api";
import { useSpotifyAuth } from "./authState";

type User = {
	id: string;
};

type GetMySelfResponse = User;

export const useMyProfile = () => {
	const [authState] = useSpotifyAuth();
	const { data, isLoading, error } = useSWR(
		authState?.accessToken ? makeKey({ token: authState.accessToken }) : null,
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
		key: "v1/me",
	};
};

const fetcher = async ({ key, token }: ReturnType<typeof makeKey>) => {
	const fetchOptions = makeSpotifyApiFetchOptions(token);

	const res = await fetch(`${SPOTIFY_API_BASE_URL}/${key}`, fetchOptions);

	const body: GetMySelfResponse = await res.json().catch(handleApiError);

	return body;
};
