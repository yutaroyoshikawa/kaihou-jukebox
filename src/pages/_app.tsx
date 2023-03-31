import { AppProps } from "next/app";
import { FC, PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";
import { useInitializeSpotifyAuth } from "../features/spotify/authStateHooks";

const CustomApp: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<RecoilRoot>
			<AppContainer>
				<Component {...pageProps} />
			</AppContainer>
		</RecoilRoot>
	);
};

export default CustomApp;

const AppContainer: FC<PropsWithChildren> = ({ children }) => {
	useInitializeSpotifyAuth();

	return <>{children}</>;
};
