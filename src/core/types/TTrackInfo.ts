import { ETrackSearchType } from '../enums/ETrackSearchType';

type TTrackInfo = {
	name: string;
	url: string | null;
	thumbnail: string | null;
	search_type: ETrackSearchType;
};
export default TTrackInfo;
