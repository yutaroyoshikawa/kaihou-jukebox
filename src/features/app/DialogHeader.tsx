import { FC, PropsWithChildren } from "react";

export const DialogHeader: FC<PropsWithChildren> = ({ children }) => {
	return <h2>{children}</h2>;
};
