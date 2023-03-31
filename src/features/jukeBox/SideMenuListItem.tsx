import { FC, PropsWithChildren } from "react";
import { css } from "../../style";

export const SideMenuListItem: FC<PropsWithChildren> = ({ children }) => {
	return <li className={listItemStyle()}>{children}</li>;
};

const listItemStyle = css({
	margin: 0,
});
