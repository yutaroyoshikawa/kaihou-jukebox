import { useCallback, useEffect, useState } from "react";
import { makeSpotifyApiFetchOptions, SPOTIFY_API_BASE_URL } from "./api";
import { useSpotifyAuth } from "./authState";
import { usePlaybackState } from "./playbackStateHooks";
import {
	useSpotifyPlayBgmPlaylist,
	useSpotifySelectBgmPlaylist,
	useSpotifySelectDevice,
} from "./playerState";

type StartSpotifyPlayerState =
	| {
			status: "initial";
			error: undefined;
	  }
	| {
			status: "loading";
			error?: Error;
	  }
	| {
			status: "success";
			error: undefined;
	  }
	| {
			status: "failed";
			error: Error;
	  };

export const useStartSpotifyPlayer = () => {
	const [startSpotifyPlayerStatus, setStartSpotifyPlayerStatus] =
		useState<StartSpotifyPlayerState>({
			status: "initial",
			error: undefined,
		});
	const [selectDevice] = useSpotifySelectDevice();
	const [authState] = useSpotifyAuth();

	const putStartSpotifyPlayer = useCallback(
		async (queries: {
			context_uri: string;
			uris?: string[];
			offset?: { position?: number; uri?: string };
			position_ms: number;
		}) => {
			if (typeof authState?.accessToken === "undefined" || !selectDevice) {
				return;
			}

			setStartSpotifyPlayerStatus((prev) => ({
				...prev,
				status: "loading",
			}));

			const fetchOptions = makeSpotifyApiFetchOptions(authState.accessToken);

			let bodyParams: { [key: string]: unknown } = {
				context_uri: queries.context_uri,
				position_ms: queries.position_ms,
			};

			if (queries.uris) {
				bodyParams = {
					...bodyParams,
					urls: queries.uris,
				};
			}

			if (queries.offset) {
				bodyParams = {
					...bodyParams,
					offset: queries.offset,
				};
			}

			const res = await fetch(
				`${SPOTIFY_API_BASE_URL}/v1/me/player/play?${new URLSearchParams({
					device_id: selectDevice.id,
				})}`,
				{
					...fetchOptions,
					method: "PUT",
					body: JSON.stringify(bodyParams),
				},
			);

			if (res instanceof Error) {
				setStartSpotifyPlayerStatus({
					status: "failed",
					error: new Error("Ooops"),
				});
				return;
			}

			setStartSpotifyPlayerStatus({
				status: "success",
				error: undefined,
			});
		},
		[selectDevice, authState?.accessToken],
	);

	return [startSpotifyPlayerStatus, putStartSpotifyPlayer] as const;
};

type PauseSpotifyPlayerState =
	| {
			status: "initial";
			error: undefined;
	  }
	| {
			status: "loading";
			error?: Error;
	  }
	| {
			status: "success";
			error: undefined;
	  }
	| {
			status: "failed";
			error: Error;
	  };

export const usePauseSpotifyPlayer = () => {
	const [pauseSpotifyPlayerStatus, setPauseSpotifyPlayerStatus] =
		useState<PauseSpotifyPlayerState>({
			status: "initial",
			error: undefined,
		});
	const [selectDevice] = useSpotifySelectDevice();
	const [authState] = useSpotifyAuth();

	const putPauseSpotifyPlayer = useCallback(async () => {
		if (typeof authState?.accessToken === "undefined" || !selectDevice) {
			return;
		}

		setPauseSpotifyPlayerStatus((prev) => ({
			...prev,
			status: "loading",
		}));

		const fetchOptions = makeSpotifyApiFetchOptions(authState.accessToken);

		const res = await fetch(
			`${SPOTIFY_API_BASE_URL}/v1/me/player/pause?${new URLSearchParams({
				device_id: selectDevice.id,
			})}`,
			{
				...fetchOptions,
				method: "PUT",
			},
		);

		if (res instanceof Error) {
			setPauseSpotifyPlayerStatus({
				status: "failed",
				error: new Error("Ooops"),
			});
			return;
		}

		setPauseSpotifyPlayerStatus({
			status: "success",
			error: undefined,
		});
	}, [selectDevice, authState?.accessToken]);

	return [pauseSpotifyPlayerStatus, putPauseSpotifyPlayer] as const;
};

type SkipToNextSpotifyPlayerState =
	| {
			status: "initial";
			error: undefined;
	  }
	| {
			status: "loading";
			error?: Error;
	  }
	| {
			status: "success";
			error: undefined;
	  }
	| {
			status: "failed";
			error: Error;
	  };

export const useSkipToNextSpotifyPlayer = () => {
	const [skipToNextSpotifyPlayerStatus, setSkipToNextSpotifyPlayerStatus] =
		useState<SkipToNextSpotifyPlayerState>({
			status: "initial",
			error: undefined,
		});
	const [selectDevice] = useSpotifySelectDevice();
	const [authState] = useSpotifyAuth();

	const putSkipToNextSpotifyPlayer = useCallback(async () => {
		if (typeof authState?.accessToken === "undefined" || !selectDevice) {
			return;
		}

		setSkipToNextSpotifyPlayerStatus((prev) => ({
			...prev,
			status: "loading",
		}));

		const fetchOptions = makeSpotifyApiFetchOptions(authState.accessToken);

		const res = await fetch(
			`${SPOTIFY_API_BASE_URL}/v1/me/player/next?${new URLSearchParams({
				device_id: selectDevice.id,
			})}`,
			{
				...fetchOptions,
				method: "POST",
			},
		);

		if (res instanceof Error) {
			setSkipToNextSpotifyPlayerStatus({
				status: "failed",
				error: new Error("Ooops"),
			});
			return;
		}

		setSkipToNextSpotifyPlayerStatus({
			status: "success",
			error: undefined,
		});
	}, [selectDevice, authState?.accessToken]);

	return [skipToNextSpotifyPlayerStatus, putSkipToNextSpotifyPlayer] as const;
};

type SkipToPreviousSpotifyPlayerState =
	| {
			status: "initial";
			error: undefined;
	  }
	| {
			status: "loading";
			error?: Error;
	  }
	| {
			status: "success";
			error: undefined;
	  }
	| {
			status: "failed";
			error: Error;
	  };

export const useSkipToPreviousSpotifyPlayer = () => {
	const [
		skipToPreviousSpotifyPlayerStatus,
		setSkipToPreviousSpotifyPlayerStatus,
	] = useState<SkipToPreviousSpotifyPlayerState>({
		status: "initial",
		error: undefined,
	});
	const [selectDevice] = useSpotifySelectDevice();
	const [authState] = useSpotifyAuth();

	const putSkipToPreviousSpotifyPlayer = useCallback(async () => {
		if (typeof authState?.accessToken === "undefined" || !selectDevice) {
			return;
		}

		setSkipToPreviousSpotifyPlayerStatus((prev) => ({
			...prev,
			status: "loading",
		}));

		const fetchOptions = makeSpotifyApiFetchOptions(authState.accessToken);

		const res = await fetch(
			`${SPOTIFY_API_BASE_URL}/v1/me/player/previous?${new URLSearchParams({
				device_id: selectDevice.id,
			})}`,
			{
				...fetchOptions,
				method: "POST",
			},
		);

		if (res instanceof Error) {
			setSkipToPreviousSpotifyPlayerStatus({
				status: "failed",
				error: new Error("Ooops"),
			});
			return;
		}

		setSkipToPreviousSpotifyPlayerStatus({
			status: "success",
			error: undefined,
		});
	}, [selectDevice, authState?.accessToken]);

	return [
		skipToPreviousSpotifyPlayerStatus,
		putSkipToPreviousSpotifyPlayer,
	] as const;
};

type SetRepeatModePlayerState =
	| {
			status: "initial";
			error: undefined;
	  }
	| {
			status: "loading";
			error?: Error;
	  }
	| {
			status: "success";
			error: undefined;
	  }
	| {
			status: "failed";
			error: Error;
	  };

export const useSetRepeatModeSpotifyPlayer = () => {
	const [repeatModeSpotifyPlayerStatus, setRepeatModeSpotifyPlayerStatus] =
		useState<SetRepeatModePlayerState>({
			status: "initial",
			error: undefined,
		});
	const [selectDevice] = useSpotifySelectDevice();
	const [authState] = useSpotifyAuth();

	const putSetRepeatModeSpotifyPlayer = useCallback(
		async (state: "track" | "context" | "off") => {
			if (typeof authState?.accessToken === "undefined" || !selectDevice) {
				return;
			}

			setRepeatModeSpotifyPlayerStatus((prev) => ({
				...prev,
				status: "loading",
			}));

			const fetchOptions = makeSpotifyApiFetchOptions(authState.accessToken);

			const res = await fetch(
				`${SPOTIFY_API_BASE_URL}/v1/me/player/repeat?${new URLSearchParams({
					device_id: selectDevice.id,
					state,
				})}`,
				{
					...fetchOptions,
					method: "PUT",
				},
			);

			if (res instanceof Error) {
				setRepeatModeSpotifyPlayerStatus({
					status: "failed",
					error: new Error("Ooops"),
				});
				return;
			}

			setRepeatModeSpotifyPlayerStatus({
				status: "success",
				error: undefined,
			});
		},
		[selectDevice, authState?.accessToken],
	);

	return [
		repeatModeSpotifyPlayerStatus,
		putSetRepeatModeSpotifyPlayer,
	] as const;
};

export const usePlayBgm = () => {
	const [selectBgmPlaylist] = useSpotifySelectBgmPlaylist();
	const [, play] = useStartSpotifyPlayer();
	const playbackState = usePlaybackState();
	const [, putRepeatMode] = useSetRepeatModeSpotifyPlayer();
	const [playableBgm] = useSpotifyPlayBgmPlaylist();

	useEffect(() => {
		if (
			!selectBgmPlaylist ||
			!selectBgmPlaylist ||
			!playbackState.data ||
			playbackState.data.is_playing ||
			!playableBgm
		) {
			putRepeatMode("off");
			return;
		}

		const playBgm = async () => {
			await play({
				context_uri: `spotify:playlist:${selectBgmPlaylist.id}`,
				offset: {
					position: 1,
				},
				position_ms: 0,
			});
			await putRepeatMode("context");
		};

		const timer = setTimeout(playBgm, 15 * 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [selectBgmPlaylist, selectBgmPlaylist, playbackState.data, playableBgm]);
};
