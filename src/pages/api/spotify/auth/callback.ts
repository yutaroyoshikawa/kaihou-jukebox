import { NextApiRequest, NextApiResponse } from "next";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const BASE_URL = process.env.BASE_URL;
console.log(BASE_URL);
const SPOTIFY_REDIRECT_URI = `${BASE_URL}/api/spotify/auth/callback`;
const AUTH_BASE_URL = "https://accounts.spotify.com/api/token";

type SoptifyApiGetAccessTokenResponse = {
	access_token: string;
	token_type: string;
	scope: string;
	expires_in: number;
	refresh_token: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const code = Array.isArray(req.query.code) ? req.query.code[0] : req.query
		.code;

	if (!code) {
		return res.status(400);
	}

	const authReq = new Request(AUTH_BASE_URL, {
		method: "POST",
		headers: {
			Authorization: `Basic ${Buffer.from(
				`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
			).toString("base64")}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			code: code,
			grant_type: "authorization_code",
			redirect_uri: SPOTIFY_REDIRECT_URI,
		}),
	});

	fetch(authReq).then(async (authRes) => {
		if (!authRes.ok) {
			res.status(500);

			return;
		}

		const resJson: SoptifyApiGetAccessTokenResponse = await authRes.json();

		const params = new URLSearchParams({
			accessToken: resJson.access_token,
			tokenType: resJson.token_type,
			scope: resJson.scope,
			expiresIn: resJson.expires_in.toString(),
			refreshToken: resJson.refresh_token,
		});

		res.redirect(`/?${params.toString()}`);
	});
};

export default handler;
