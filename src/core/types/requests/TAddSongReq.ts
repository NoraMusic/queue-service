import TTrackInfo from '../TTrackInfo';

type TAddSongRequest = {
	Params: { guildId: string };
	Body: TTrackInfo;
};

export default TAddSongRequest;
