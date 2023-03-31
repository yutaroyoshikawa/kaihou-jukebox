import { FC, PropsWithChildren } from "react";
import { css } from "../../style";

export const SideMenuList: FC<PropsWithChildren> = ({ children }) => {
	return <ul className={ulStyle()}>{children}</ul>;
};

const ulStyle = css({
	margin: 0,
	listStyle: "none",
});
