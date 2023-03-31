import { FC, PropsWithChildren } from "react";
import { css } from "../../style";

export const JukeBoxFooter: FC<PropsWithChildren> = ({ children }) => {
	return <footer className={jukeboxFooterStyle()}>{children}</footer>;
};

const jukeboxFooterStyle = css({
	gridArea: "footer",
	height: "100%",
});
