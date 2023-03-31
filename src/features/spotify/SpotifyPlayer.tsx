import { FC, useMemo } from "react";
import { css } from "../../style";
import { useResizeObserve } from "../app/hooks";
import { usePlaybackState } from "./playbackStateHooks";
import { useStartSpotifyPlayer } from "./playerHooks";
import { useSpotifySelectPlaylist } from "./playerState";
import { usePlaylist } from "./playlistHooks";
import { PlaylistTrackList } from "./PlaylistTrackList";
import { PlaylistTracksCoverflow } from "./PlaylistTracksCoverflow";

export const SpotifyPlayer: FC = () => {
	const [selectPlaylist] = useSpotifySelectPlaylist();

	if (!selectPlaylist?.id) {
		return null;
	}

	return <PlaylistContents playlistId={selectPlaylist.id} />;
};

const PlaylistContents: FC<{ playlistId: string }> = ({ playlistId }) => {
	const playlist = usePlaylist(playlistId);
	const [, play] = useStartSpotifyPlayer();
	const playbackState = usePlaybackState();
	const [resizeObserveRef, rect] = useResizeObserve<HTMLDivElement>();

	const selectTrackId = useMemo(() => {
		if (!playlist.data) {
			return;
		}

		const selectTrack = playlist.data?.tracks.items.find(
			(track) =>
				`spotify:track:${track.track.id}` === playbackState.data?.item.uri,
		);

		if (!selectTrack) {
			return playlist.data.tracks.items[0].track.id;
		}

		return selectTrack.track.id;
	}, [playlist.data, playbackState.data]);

	if (!playlist.data || !selectTrackId) {
		return null;
	}

	return (
		<div className={spotifyPlayerStyle()}>
			<div className={coverflowStyle()} ref={resizeObserveRef}>
				<PlaylistTracksCoverflow
					tracks={playlist.data.tracks.items.map((item) => item.track)}
					onChangeSelectTrack={console.log}
					selectTrackId={selectTrackId}
					onRequestPlayTrack={async (trackId) => {
						await play({
							context_uri: `spotify:playlist:${playlistId}`,
							offset: {
								uri: `spotify:track:${trackId}`,
							},
							position_ms: 0,
						});
						await playbackState.revalidate();
					}}
					width={rect?.width ?? 800}
				/>
			</div>
			<h2 className={trackListTitleStyle()}>トラックリスト</h2>
			<div className={trackListContainerStyle()}>
				<div className={trackListStyle()}>
					<PlaylistTrackList
						tracks={playlist.data.tracks.items.map((item) => item.track)}
						selectTrackId={selectTrackId}
						onRequestPlayTrack={async (trackId) => {
							await play({
								context_uri: `spotify:playlist:${playlistId}`,
								offset: {
									uri: `spotify:track:${trackId}`,
								},
								position_ms: 0,
							});
							await playbackState.revalidate();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

const spotifyPlayerStyle = css({
	display: "grid",
	rowGap: "10px",
	gridTemplateRows: "minmax(300px, auto) auto 1fr",
	gridTemplateColumns: "1fr",
	height: "100%",
	width: "100%",
});

const coverflowStyle = css({
	height: "100%",
	minHeight: "500px",
	width: "100%",
	display: "grid",
	gridTemplateColumns: "auto",
	gridTemplateRows: "auto",
	alignItems: "center",
	overflowX: "auto",
});

const trackListTitleStyle = css({
	margin: "0",
	padding: "0 20px",
	fontSize: "20px",
	color: "#ddd",
});

const trackListContainerStyle = css({
	height: "100%",
	position: "relative",
	overflowY: "scroll",
});

const trackListStyle = css({
	height: "100%",
	padding: "0 20px",
});
