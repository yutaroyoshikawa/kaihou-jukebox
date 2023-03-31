import { FC, PropsWithChildren, SyntheticEvent } from "react";
import { css } from "../../style";

type DialogProps = PropsWithChildren<{
	onRequestCloseDialog: (
		event: SyntheticEvent<HTMLDialogElement, Event>,
	) => void;
	isOpen: boolean;
}>;

export const Dialog: FC<DialogProps> = ({
	onRequestCloseDialog,
	isOpen,
	children,
}) => {
	return (
		<dialog
			className={dialogStyle()}
			open={isOpen}
			onClose={onRequestCloseDialog}
		>
			{isOpen && <>{children}</>}
		</dialog>
	);
};

const dialogStyle = css({
	position: "fixed",
	zIndex: 100,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
});
