import shuffleArray from '../../utils/shuffle';
import TQueueItem from '../types/TQueueItem';
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

	public static async getQueue(guildId: string): Promise<TQueueItem[] | false> {
		const result: string[] | false = await RedisService.getFullList(`queue:${guildId}`);
		if (!result) return false;
		return result.map((queueItem) => JSON.parse(queueItem));
	}

	public static async removeTrack(guildId: string, trackUuid: string): Promise<number | false> {
		const queue: TQueueItem[] | false = await this.getQueue(guildId);
		const match: TQueueItem | undefined = (queue || []).find((track) => track.uuid === trackUuid);
		if (match === undefined) return false;
		return await RedisService.listRemoveByValue(`queue:${guildId}`, JSON.stringify(match));
	}

	public static async clearQueue(guildId: string): Promise<number | false> {
		return await RedisService.removeKey(`queue:${guildId}`);
	}

	public static async shuffleQueue(guildId: string): Promise<number | false> {
		const queueKey = `queue:${guildId}`;
		const queue: string[] | false = await RedisService.getFullList(`queue:${guildId}`);
		if (!queue) return false;

		const shuffledArray: string[] = shuffleArray<string>(queue);
		await RedisService.removeKey(queueKey);
		return await RedisService.listRightPush(queueKey, shuffledArray);
	}
}
