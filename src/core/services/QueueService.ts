import TTrackInfo from '../types/TTrackInfo';
import RedisService from './RedisService';
import { randomUUID } from 'crypto';

export default class QueueService {
	public static async addSong(track: TTrackInfo, guildId: string): Promise<string | false> {
		const uuid: string = randomUUID();
		const cacheValue: object = { uuid, track };

		const result: number | false = await RedisService.listRightPush(`queue:${guildId}`, JSON.stringify(cacheValue));
		if (!result) return false;
		return uuid;
	}
}
