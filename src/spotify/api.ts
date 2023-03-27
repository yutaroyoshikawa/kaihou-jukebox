export const SPOTIFY_API_BASE_URL = "https://api.spotify.com";

export const makeSpotifyApiFetchOptions = (token: string): RequestInit => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	};
};

export const handleApiError = (error: unknown) => {
	if (error instanceof Error) {
		throw error;
	}

	return error;
};
