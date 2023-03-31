import { FC } from "react";
import { FiPlayCircle } from "react-icons/fi";
import { css } from "../../style";
import { Playlist } from "./playlistHooks";

type PlaylistTrackListProps = {
	tracks: Playlist["track"][];
	selectTrackId: string;
	onRequestPlayTrack: (trackId: string) => void;
};

export const PlaylistTrackList: FC<PlaylistTrackListProps> = ({
	tracks,
	selectTrackId,
	onRequestPlayTrack,
}) => {
	return (
		<ul className={listStyle()}>
			{tracks.map((track) => (
				<li key={track.id} className={listItemStyle()}>
					<button
						className={buttonStyle()}
						type="button"
						onClick={() => onRequestPlayTrack(track.id)}
					>
						<span className={playIconStyle()}>
							<FiPlayCircle />
						</span>
						<img
							className={albumImageStyle()}
							src={track.album.images[0]?.url ?? ""}
							width={track.album.images[0]?.width}
							height={track.album.images[0]?.height}
							alt=""
						/>
						<span>{track.name}</span>
					</button>
				</li>
			))}
		</ul>
	);
};

const listStyle = css({
	margin: 0,
	padding: "10px 0",
	listStyle: "none",
	overflowY: "scroll",
	"&> :not(:last-child)": {
		borderBottom: "solid 1px rgba(255, 255, 255, 0.3)",
	},
});

const listItemStyle = css({
	margin: 0,
});

const buttonStyle = css({
	width: "100%",
	backgroundColor: "transparent",
	border: "none",
	padding: "20px 0",
	display: "flex",
	columnGap: "10px",
	alignItems: "center",
	color: "#fff",
	fontSize: "16px",
	"&:disabled": {
		filter: "brightness(50%)",
	},
});

const playIconStyle = css({
	fontSize: "28px",
});

const albumImageStyle = css({
	width: "50px",
	height: "auto",
});
