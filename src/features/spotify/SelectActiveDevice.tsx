import { FC } from "react";
import { useAvailableDevices } from "./availableDevicesHooks";
import { useSpotifySelectDevice } from "./playerState";

export const SelectActiveDevice: FC = () => {
	const activeDevice = useAvailableDevices();
	const [selectDevice, setSelectDevice] = useSpotifySelectDevice();

	return (
		<ul>
			{activeDevice.data?.devices.map((device) => (
				<li key={device.id}>
					{device.name}
					<button
						type="button"
						onClick={() => setSelectDevice(device.id)}
						disabled={device.id === selectDevice?.id}
					>
						{device.id === selectDevice?.id ? "選択中" : "選択"}
					</button>
				</li>
			))}
		</ul>
	);
};
