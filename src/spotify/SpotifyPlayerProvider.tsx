import { FC, PropsWithChildren } from "react";
import { spotifyPlayerCtx, useSpotifyPlayerCore } from "./playerHooks";

export const SpotifyPlayerProvider: FC<PropsWithChildren> = ({ children }) => {
	const player = useSpotifyPlayerCore();

	return (
		<spotifyPlayerCtx.Provider value={player}>
			{children}
		</spotifyPlayerCtx.Provider>
	);
};
