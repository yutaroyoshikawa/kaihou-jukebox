import { useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import { useAvailableDevices } from "./availableDevicesHooks";
import { useMyPlaylists } from "./myPlaylistsHooks";

const spotifySelectActiveDevice = atom<string | undefined>({
	key: "spotify/selectDevices",
	default: undefined,
});

export const useSpotifySelectDevice = () => {
	const availableDevices = useAvailableDevices();
	const [state, setState] = useRecoilState(spotifySelectActiveDevice);

	const selectDevice = useMemo(() => {
		if (!availableDevices.data || typeof state === "undefined") {
			return;
		}

		const availableDeviceMap = Object.fromEntries(
			availableDevices.data.devices.map((device) => [device.id, device]),
		);

		return availableDeviceMap[state];
	}, [availableDevices.data, state]);

	return [selectDevice, setState] as const;
};

const spotifySelectPlaylist = atom<string | undefined>({
	key: "spotify/selectPlaylist",
	default: undefined,
});

export const useSpotifySelectPlaylist = () => {
	const myPlaylists = useMyPlaylists();
	const [state, setState] = useRecoilState(spotifySelectPlaylist);

	const selectPlaylist = useMemo(() => {
		if (!myPlaylists.data || typeof state === "undefined") {
			return;
		}

		const myPlaylistMap = Object.fromEntries(
			myPlaylists.data.items.map((playlist) => [playlist.id, playlist]),
		);

		return myPlaylistMap[state];
	}, [myPlaylists.data, state]);

	return [selectPlaylist, setState] as const;
};

const spotifySelectBgmPlaylist = atom<string | undefined>({
	key: "spotify/selectBgmPlaylist",
	default: undefined,
});

export const useSpotifySelectBgmPlaylist = () => {
	const myPlaylists = useMyPlaylists();
	const [state, setState] = useRecoilState(spotifySelectBgmPlaylist);

	const selectBgmPlaylist = useMemo(() => {
		if (!myPlaylists.data || typeof state === "undefined") {
			return;
		}

		const myPlaylistMap = Object.fromEntries(
			myPlaylists.data.items.map((playlist) => [playlist.id, playlist]),
		);

		return myPlaylistMap[state];
	}, [myPlaylists.data, state]);

	return [selectBgmPlaylist, setState] as const;
};

const spotifyPlayBgmPlaylist = atom<boolean>({
	key: "spotify/playBgmPlaylist",
	default: true,
});

export const useSpotifyPlayBgmPlaylist = () => {
	const state = useRecoilState(spotifyPlayBgmPlaylist);

	return state;
};
