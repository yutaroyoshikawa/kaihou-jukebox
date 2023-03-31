import { FC } from "react";
import { css, globalStyle } from "../../style";
import { useSpotifyAuth } from "../spotify/authState";
import { useRefleshToken } from "../spotify/authStateHooks";
import { usePlaybackState } from "../spotify/playbackStateHooks";
import { PlayerConsole } from "../spotify/PlayerConsole";
import { usePlayBgm } from "../spotify/playerHooks";
import { SpotifyPlayer } from "../spotify/SpotifyPlayer";
import { SpotifySideMenu } from "../spotify/SpotifySideMenu";
import { JukeBoxBody } from "./JukeBoxBody";
import { JukeBoxFooter } from "./JukeBoxFooter";
import { JukeBoxHeader } from "./JukeBoxHeader";
import { JukeBoxLayout } from "./JukeBoxLayout";
import { JukeBoxSideMenu } from "./JukeBoxSideMenu";

globalStyle();

export const JukeBoxSpotifyApp: FC = () => {
	const [authState] = useSpotifyAuth();

	if (!authState?.accessToken) {
		return <a href="/api/spotify/auth/login">Login with Spotify</a>;
	}

	return <SpotifyApp />;
};

const SpotifyApp: FC = () => {
	const playbackState = usePlaybackState();

	useRefleshToken();
	usePlayBgm();

	return (
		<div
			style={{
				backgroundImage: `url(${playbackState.data?.item?.album.images[0]?.url})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backdropFilter: "brightness(60%)",
			}}
		>
			<JukeBoxLayout>
				<JukeBoxHeader>
					<h1 className={headerStyle()}>KAIHOU JUKEBOX</h1>
				</JukeBoxHeader>
				<JukeBoxBody><SpotifyPlayer /></JukeBoxBody>
				<JukeBoxSideMenu><SpotifySideMenu /></JukeBoxSideMenu>
				<JukeBoxFooter><PlayerConsole /></JukeBoxFooter>
			</JukeBoxLayout>
		</div>
	);
};

const headerStyle = css({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "16px",
	color: "#aaa",
});
