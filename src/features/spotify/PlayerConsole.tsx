import { FC } from "react";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { FiPlayCircle } from "react-icons/fi";
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import { css } from "../../style";
import { usePlaybackState } from "./playbackStateHooks";
import {
	usePauseSpotifyPlayer,
	useSkipToNextSpotifyPlayer,
	useSkipToPreviousSpotifyPlayer,
	useStartSpotifyPlayer,
} from "./playerHooks";

export const PlayerConsole: FC = () => {
	const playbackState = usePlaybackState();
	const [, requestSkipToPrevious] = useSkipToPreviousSpotifyPlayer();
	const [, requestSkipToNext] = useSkipToNextSpotifyPlayer();
	const [, requestPause] = usePauseSpotifyPlayer();
	const [, requestStart] = useStartSpotifyPlayer();

	if (typeof playbackState.data === "undefined") {
		return null;
	}

	return (
		<div className={wrapStyle()}>
			<div className={playerConsoleContainerStyle()}>
				<button
					className={buttonStyle()}
					type="button"
					onClick={requestSkipToPrevious}
				>
					<RxTrackPrevious />
				</button>
				{playbackState.data.is_playing ? (
					<button
						className={buttonStyle()}
						type="button"
						onClick={async () => {
							await requestPause();
							await playbackState.revalidate();
						}}
					>
						<AiOutlinePauseCircle />
					</button>
				) : (
					<button
						className={buttonStyle()}
						type="button"
						onClick={async () => {
							if (!playbackState.data) {
								return;
							}

							await requestStart({
								context_uri: playbackState.data.context.uri,
								position_ms: playbackState.data.progress_ms,
								offset: {
									uri: playbackState.data.item.uri,
								},
							});
							await playbackState.revalidate();
						}}
					>
						<FiPlayCircle />
					</button>
				)}
				<button
					className={buttonStyle()}
					type="button"
					onClick={requestSkipToNext}
				>
					<RxTrackNext />
				</button>
			</div>
			<p className={playingTrackContainerStyle()}>
				<span className={playingTrackLabelStyle()}>再生中の曲</span>
				<img
					className={playingTrackImageStyle()}
					src={playbackState.data.item?.album.images[0]?.url}
					width={playbackState.data.item?.album.images[0]?.width}
					height={playbackState.data.item?.album.images[0]?.height}
					alt=""
				/>
				<span className={playingTrackNameStyle()}>
					{playbackState.data.item?.name}
				</span>
			</p>
		</div>
	);
};

const wrapStyle = css({
	width: "100%",
	height: "100%",
	display: "grid",
	gridTemplateRows: "40px 30px",
	columnGap: "4px",
});

const playerConsoleContainerStyle = css({
	width: "100%",
	height: "100%",
	display: "grid",
	columnGap: "30px",
	gridTemplateColumns: "80px 80px 80px",
	justifyContent: "center",
	alignItems: "center",
});

const buttonStyle = css({
	height: "40px",
	width: "40px",
	backgroundColor: "transparent",
	border: "none",
	color: "#fff",
	fontSize: "40px",
});

const playingTrackContainerStyle = css({
	padding: "10px 30px",
	display: "flex",
	columnGap: "10px",
	alignItems: "center",
});

const playingTrackLabelStyle = css({
	borderRadius: "6px",
	backgroundColor: "#fff",
	color: "#000",
	fontWeight: "bold",
	fontSize: "12px",
	padding: "6px",
});

const playingTrackImageStyle = css({
	height: "30px",
	width: "auto",
});

const playingTrackNameStyle = css({
	color: "#fff",
	fontWeight: "bold",
	fontSize: "16px",
});
