import { FC, PropsWithChildren } from "react";
import { css } from "../../style";

export const JukeBoxSideMenu: FC<PropsWithChildren> = ({ children }) => {
	return <div className={jukeBoxSideMenuStyle()}>{children}</div>;
};

const jukeBoxSideMenuStyle = css({
	gridArea: "side",
});
