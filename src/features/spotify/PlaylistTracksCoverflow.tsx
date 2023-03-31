import { FC, useMemo } from "react";
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Playlist } from "./playlistHooks";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { css } from "../../style";

type PlaylistTracksCoverflowProps = {
	tracks: Playlist["track"][];
	selectTrackId: string;
	onChangeSelectTrack: (trackId: string) => void;
	onRequestPlayTrack: (trackId: string) => void;
	width: number;
};

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

export const PlaylistTracksCoverflow: FC<PlaylistTracksCoverflowProps> = ({
	tracks,
	selectTrackId,
	onChangeSelectTrack,
	onRequestPlayTrack,
	width,
}) => {
	const selectTrackIndex = useMemo(() => {
		const index = tracks.findIndex((track) => track.id === selectTrackId);

		return index;
	}, [tracks, selectTrackId]);

	return (
		<Swiper
			navigation
			modules={[EffectCoverflow]}
			effect="coverflow"
			coverflowEffect={{
				rotate: 15,
				stretch: 0,
				depth: 200,
				modifier: 1,
				slideShadows: false,
			}}
			initialSlide={selectTrackIndex}
			onSlideChange={(event) =>
				onChangeSelectTrack(tracks[event.activeIndex]?.id ?? "")
			}
			slidesPerView={3}
			centeredSlides
			loop
			style={{ width: `${width}px` }}
		>
			{tracks.map((track) => (
				<SwiperSlide key={track.id}>
					<button
						type="button"
						className={coverItemContainerStyle()}
						onClick={() => onRequestPlayTrack(track.id)}
					>
						<span className={trackNameStyle()}>{track.name}</span>
						{track.album.images[0] && (
							<img
								src={track.album.images[0].url}
								width={track.album.images[0].width}
								height={track.album.images[0].height}
								alt=""
								className={albumImageStyle()}
							/>
						)}
						<span className={trackNameStyle()}>選択して再生</span>
					</button>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

const coverItemContainerStyle = css({
	width: "300px",
	height: "auto",
	display: "grid",
	justifyContent: "center",
	rowGap: "10px",
	backgroundColor: "transparent",
	border: "none",
});

const trackNameStyle = css({
	color: "#fff",
	fontSize: "16px",
	fontWeight: "bold",
});

const albumImageStyle = css({
	width: "100%",
	height: "auto",
});
