import { atom, useRecoilState } from "recoil";

export type SpotifyAuth = {
	accessToken: string;
	tokenType: string;
	scope: string;
	expiresIn: number;
	refreshToken: string;
};

const spotifyAuth = atom<SpotifyAuth | undefined>({
	key: "spotify/authState",
	default: undefined,
});

export const useSpotifyAuth = () => {
	const state = useRecoilState(spotifyAuth);

	return state;
};
