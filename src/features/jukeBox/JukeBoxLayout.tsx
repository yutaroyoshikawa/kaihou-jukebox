import { FC, PropsWithChildren } from "react";
import { css } from "../../style";

export const JukeBoxLayout: FC<PropsWithChildren> = ({ children }) => {
	return <main className={jukeBoxLayoutStyle()}>{children}</main>;
};

const jukeBoxLayoutStyle = css({
	height: "100vh",
	display: "grid",
	gridTemplateAreas: `
    "header header"
    "body side"
    "footer footer"
  `,
	gridTemplateColumns: "minmax(380px, 1fr) 360px",
	gridTemplateRows: "60px 1fr 100px",
	backdropFilter: "blur(10px)",
	backgroundColor: "rgba(0, 0, 0, 0.8)",
	color: "#fff",
});
