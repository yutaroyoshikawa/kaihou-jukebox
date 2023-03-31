import { FC, PropsWithChildren } from "react";
import { css } from "../../style";

export const JukeBoxBody: FC<PropsWithChildren> = ({ children }) => {
	return <div className={jukeBoxBodyStyle()}>{children}</div>;
};

const jukeBoxBodyStyle = css({
	gridArea: "body",
	height: "100%",
	overflow: "auto",
});
