import { RedisClientType } from 'redis';
import RedisService from './RedisService';

export default class QueueService {
	private static cache: RedisClientType = RedisService.getInstance();

	public static async addSong(url: string) {}
}
