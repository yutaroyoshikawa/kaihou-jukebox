import { FC, PropsWithChildren } from "react";
import { css } from "../../style";

export const JukeBoxHeader: FC<PropsWithChildren> = ({ children }) => {
	return <header className={jukeboxHeaderStyle()}>{children}</header>;
};

const jukeboxHeaderStyle = css({
	gridArea: "header",
	height: "100%",
});
