import crypto from "crypto";
import dotenv from "dotenv";
import express from "express";

const PORT = 6000;

dotenv.config();

const app = express();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const SPOTIFY_REDIRECT_URI = "http://localhost:3000";
const SPOTIFY_AUTH_SCOPE = "streaming user-read-email user-read-private";

app.get("/auth/login", (_, res) => {
	const state = crypto.randomUUID();

	const authQueryParameters = new URLSearchParams({
		response_type: "code",
		client_id: SPOTIFY_CLIENT_ID ?? "",
		scope: SPOTIFY_AUTH_SCOPE,
		redirect_uri: SPOTIFY_REDIRECT_URI,
		state,
	});

	res.redirect(
		`https://accounts.spotify.com/authorize/?${authQueryParameters.toString()}`,
	);
});

app.get("/auth/callback", (_, res) => {
	res.redirect("/");
});

app.get("/auth/token", (req, res) => {
	const code = req.query.code?.toString() ?? "";

	const AUTH_BASE_URL = "https://accounts.spotify.com/api/token";

	const formData = new FormData();

	formData.append("code", code);
	formData.append("redirect_uri", SPOTIFY_REDIRECT_URI);
	formData.append("grant_type", "authorization_code");

	fetch(AUTH_BASE_URL, {
		method: "POST",
		headers: {
			Authorization: `Basic${(
				Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
					"base64",
				)
			)}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: formData,
	}).then(async (authRes) => {
		const resJson = await authRes.json();

		const token = resJson["access_token"];

		res.json({ accessToken: token });
	});
});

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});
