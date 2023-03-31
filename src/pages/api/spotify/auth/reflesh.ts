import { NextApiRequest, NextApiResponse } from "next";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const AUTH_BASE_URL = "https://accounts.spotify.com/api/token";

type SoptifyApiGetRefreshTokenResponse = {
	access_token: string;
	token_type: string;
	scope: string;
	expires_in: number;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const refreshToken = Array.isArray(req.query.refreshToken) ? req.query
		.refreshToken[0] : req.query.refreshToken;

	if (!refreshToken) {
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
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		}),
	});

	fetch(authReq).then(async (authRes) => {
		if (!authRes.ok) {
			res.status(500);

			return;
		}

		const resJson: SoptifyApiGetRefreshTokenResponse = await authRes.json();

		const params = {
			accessToken: resJson.access_token,
			tokenType: resJson.token_type,
			scope: resJson.scope,
			expiresIn: resJson.expires_in,
		};

		res.status(200).json(params);
	});
};

export default handler;
