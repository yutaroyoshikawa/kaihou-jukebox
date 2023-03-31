import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const BASE_URL = process.env.BASE_URL ?? process.env.VERCEL_URL;
const SPOTIFY_REDIRECT_URI = `${BASE_URL}/api/spotify/auth/callback`;

const spotifyAuthScopes = [
	"streaming",
	"user-read-email",
	"user-read-private",
	"user-read-playback-state",
	"user-modify-playback-state",
	"playlist-read-private",
	"playlist-read-collaborative",
];

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
	const state = crypto.randomUUID();

	const authQueryParameters = new URLSearchParams({
		response_type: "code",
		client_id: SPOTIFY_CLIENT_ID ?? "",
		scope: spotifyAuthScopes.join(" "),
		redirect_uri: SPOTIFY_REDIRECT_URI,
		state,
	});

	res.redirect(
		`https://accounts.spotify.com/authorize/?${authQueryParameters.toString()}`,
	);
};

export default handler;
