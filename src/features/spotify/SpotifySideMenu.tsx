import Image from "next/image";
import { FC, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { css } from "../../style";
import { useMyPlaylists } from "./myPlaylistsHooks";
import { PlayerSettingsDialog } from "./PlayerSettingsDialog";
import { useSpotifySelectPlaylist } from "./playerState";

export const SpotifySideMenu: FC = () => {
	const playlist = useMyPlaylists();
	const [selectPlaylist, setSelectPlaylist] = useSpotifySelectPlaylist();

	const [isOpenSettings, setIsOpenSettings] = useState(false);

	return (
		<div className={sideMenuContainerStyle()}>
			<PlayerSettingsDialog
				isOpen={isOpenSettings}
				onRequestCloseDialog={() => setIsOpenSettings(false)}
			/>
			<div className={settingsContainerStyle()}>
				<button
					name="プレイヤー設定"
					type="button"
					onClick={() => setIsOpenSettings(true)}
					className={settingsButtonStyle()}
				>
					<FiSettings />
				</button>
			</div>
			<h2 className={playlistTitleStyle()}>プレイリスト</h2>
			{(playlist.data?.items ?? []).length > 0 && (
				<ul className={listStyle()}>
					{playlist.data?.items?.filter(
						(item) => item.name.startsWith("【プレイリスト】"),
					).map(
						(playlist) => (
							<li key={playlist.id} className={listItemStyle()}>
								<button
									type="button"
									onClick={() => setSelectPlaylist(playlist.id)}
									disabled={playlist.id === selectPlaylist?.id}
									className={playlistButtonStyle()}
								>
									{playlist.images[0] && (
										<span>
											<Image
												src={playlist.images[0].url}
												width={playlist.images[0].width}
												height={playlist.images[0].height}
												className={playlistImageStyle()}
												alt=""
											/>
										</span>
									)}
									<span className={playlistNameStyle()}>{playlist.name}</span>
								</button>
							</li>
						),
					)}
				</ul>
			)}
		</div>
	);
};

const sideMenuContainerStyle = css({
	padding: "20px",
	height: "100%",
});

const settingsContainerStyle = css({
	width: "100%",
	display: "grid",
	justifyContent: "right",
});

const settingsButtonStyle = css({
	width: "30px",
	height: "30px",
	backgroundColor: "transparent",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	color: "#fff",
	fontSize: "30px",
	border: "none",
});

const playlistTitleStyle = css({
	fontSize: "20px",
	color: "#ddd",
	textAlign: "center",
});

const listStyle = css({
	margin: 0,
	display: "grid",
	rowGap: "150px",
	listStyle: "none",
});

const listItemStyle = css({
	padding: "20px 0",
});

const playlistButtonStyle = css({
	height: "100px",
	width: "100%",
	padding: "20px",
	display: "grid",
	backgroundColor: "transparent",
	border: "none",
	color: "#fff",

	"&:disabled": {
		filter: "brightness(50%)",
	},
});

const playlistImageStyle = css({
	width: "80%",
	height: "auto",
});

const playlistNameStyle = css({
	fontSize: "16px",
	fontWeight: "bold",
});
