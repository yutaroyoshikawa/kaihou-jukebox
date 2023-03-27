/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SPOTIFY_CLIENT_SECRET: string;
	readonly VITE_SPOTIFY_CLIENT_ID: string;
	readonly VITE_SPOTIFY_PLAYER_AUTH_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
