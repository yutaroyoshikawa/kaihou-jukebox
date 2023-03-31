import { useEffect, useRef, useState } from "react";

export const useResizeObserve = <T extends HTMLElement>() => {
	const observeRef = useRef<T>(null);
	const [rect, setRect] = useState<
			| {
				width: number;
				height: number;
				x: number;
				y: number;
			}
			| undefined
	>(observeRef.current?.getBoundingClientRect());

	useEffect(() => {
		if (!observeRef.current) {
			return;
		}

		const resizeObserver = new ResizeObserver((entries) => {
			setRect(entries[0].contentRect);
		});

		resizeObserver.observe(observeRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, [observeRef, setRect]);

	return [observeRef, rect] as const;
};
