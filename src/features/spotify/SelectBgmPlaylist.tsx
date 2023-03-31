import { FC } from "react";
import { useMyPlaylists } from "./myPlaylistsHooks";
import { useSpotifySelectBgmPlaylist } from "./playerState";

export const SelectBgmPlaylist: FC = () => {
	const playlist = useMyPlaylists();
	const [selectBgmPlaylist, setSelectBgmPlaylist] =
		useSpotifySelectBgmPlaylist();

	return (
		<ul>
			{playlist.data?.items?.map((playlist) => (
				<li key={playlist.id}>
					{playlist.name}
					<button
						onClick={() => setSelectBgmPlaylist(playlist.id)}
						disabled={playlist.id === selectBgmPlaylist?.id}
					>
						{playlist.id === selectBgmPlaylist?.id ? "BGM選択中" : "BGM選択"}
					</button>
				</li>
			))}
		</ul>
	);
};
