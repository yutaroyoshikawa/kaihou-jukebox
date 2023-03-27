import { FC, useEffect } from "react";
import { useAvailableDevices } from "./availableDevicesHooks";
import { useSpotifyPlayer } from "./playerHooks";

export const SpotifyPlayer: FC = () => {
	const player = useSpotifyPlayer();
	const availableDevices = useAvailableDevices();

	useEffect(() => {
		if (player) {
			player.connect();
		}
	}, [player]);

	if (!availableDevices.data) {
		return null;
	}

	return <>{JSON.stringify(availableDevices.data)}</>;
};
