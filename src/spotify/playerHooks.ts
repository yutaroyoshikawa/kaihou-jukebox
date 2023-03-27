import { createContext, useContext, useEffect, useState } from "react";

const SPOTIFY_PLAYER_AUTH_TOKEN = import.meta.env
	.VITE_SPOTIFY_PLAYER_AUTH_TOKEN;

const SPOTIFY_PLAYER_SDK_SRC = "https://sdk.scdn.co/spotify-player.js";

export const spotifyPlayerCtx = createContext<Spotify.Player | undefined>(
	undefined,
);

export const useSpotifyPlayerCore = () => {
	const [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player>();

	useEffect(() => {
		if (spotifyPlayer) {
			return;
		}

		const script = document.createElement("script");
		script.src = SPOTIFY_PLAYER_SDK_SRC;
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: "KAIHOU-JUKEBOX-SPOTIFY",
				getOAuthToken: (cb) => cb(SPOTIFY_PLAYER_AUTH_TOKEN),
			});

			setSpotifyPlayer(player);
		};
	}, []);

	return spotifyPlayer;
};

export const useSpotifyPlayer = () => {
	const player = useContext(spotifyPlayerCtx);

	return player;
};
