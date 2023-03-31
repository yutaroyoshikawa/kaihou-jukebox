import { createStitches } from "@stitches/core";

const { globalCss, css } = createStitches();

export const globalStyle = globalCss({
	body: {
		margin: 0,
		padding: 0,
	},
});

export { css };
