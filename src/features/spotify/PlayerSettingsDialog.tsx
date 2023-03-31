import { FC, SyntheticEvent } from "react";
import { Dialog } from "../app/Dialog";
import { DialogBody } from "../app/DialogBody";
import { DialogFooter } from "../app/DialogFooter";
import { DialogHeader } from "../app/DialogHeader";
import { useSpotifyPlayBgmPlaylist } from "./playerState";
import { SelectActiveDevice } from "./SelectActiveDevice";
import { SelectBgmPlaylist } from "./SelectBgmPlaylist";

type PlayerSettingsDialogProps = {
	onRequestCloseDialog: (
		event?: SyntheticEvent<HTMLDialogElement, Event>,
	) => void;
	isOpen: boolean;
};

export const PlayerSettingsDialog: FC<PlayerSettingsDialogProps> = ({
	...dialogProps
}) => {
	return (
		<Dialog {...dialogProps}>
			<DialogHeader>Player Settings</DialogHeader>
			<DialogBody>
				<h3>Select Active Device</h3>
				<SelectActiveDevice />

				<h3>BGM Playlist</h3>
				<SelectBgmPlaylist />

				<h3>Auto Play BGM</h3>
				<label>
					Auto Play
					<AutoPlayBgmCheckBox />
				</label>
			</DialogBody>
			<DialogFooter>
				<button
					type="button"
					onClick={() => dialogProps.onRequestCloseDialog()}
				>
					閉じる
				</button>
			</DialogFooter>
		</Dialog>
	);
};

const AutoPlayBgmCheckBox: FC = () => {
	const [autoPlayBgm, setAutoPlayBgm] = useSpotifyPlayBgmPlaylist();

	return (
		<input
			type="checkbox"
			checked={autoPlayBgm}
			onChange={(event) => setAutoPlayBgm(event.currentTarget.checked)}
		/>
	);
};
