type TMoveTrackReq = {
	Params: { guildId: string; trackId: string };
	Body: {
		index: number;
	};
};

export default TMoveTrackReq;
