import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSpotifyAuth } from "./authState";

export const useInitializeSpotifyAuth = () => {
	const router = useRouter();
	const [, setSpotifyAuth] = useSpotifyAuth();

	useEffect(() => {
		if (!router.isReady) {
			return;
		}

		const { accessToken, tokenType, scope, expiresIn, refreshToken } =
			router.query;

		if (!accessToken || !tokenType || !scope || !expiresIn || !refreshToken) {
			return;
		}

		const authState = {
			accessToken: Array.isArray(accessToken) ? accessToken[0] : accessToken,
			tokenType: Array.isArray(tokenType) ? tokenType[0] : tokenType,
			scope: Array.isArray(scope) ? scope[0] : scope,
			expiresIn: Number(Array.isArray(expiresIn) ? expiresIn[0] : expiresIn),
			refreshToken: Array.isArray(refreshToken) ? refreshToken[0] : refreshToken,
		};

		setSpotifyAuth(authState);
	}, [router.query, router.isReady, setSpotifyAuth]);
};

export const useRefleshToken = () => {
	const [spotifyAuth, setSpotifyAuth] = useSpotifyAuth();

	useEffect(() => {
		if (!spotifyAuth?.refreshToken) {
			return;
		}

		const refreshToken = async () => {
			const res = await fetch(
				`/api/spotify/auth/reflesh?${
					new URLSearchParams({
						refreshToken: spotifyAuth.refreshToken,
					})
				}`,
			);

			if (!res.ok) {
				return;
			}

			const body: {
				accessToken: string;
				tokenType: string;
				scope: string;
				expiresIn: number;
			} = await res.json();

			setSpotifyAuth((prev) => {
				if (!prev) {
					return {
						...body,
						refreshToken: "",
					};
				}

				return ({
					...prev,
					...body,
				});
			});
		};

		const timer = setTimeout(
			refreshToken,
			spotifyAuth.expiresIn - new Date().getTime(),
		);

		return () => {
			clearTimeout(timer);
		};
	}, [spotifyAuth?.refreshToken, setSpotifyAuth, spotifyAuth?.expiresIn]);
};
