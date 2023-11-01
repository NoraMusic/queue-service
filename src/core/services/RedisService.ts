import { RedisClientType, createClient } from 'redis';

export default class RedisService {
	private static readonly REDIS_URL: string = 'redis://default:redis@redis.local:6379';
	public static client: RedisClientType;

	static async connect() {
		this.client = createClient({
			url: this.REDIS_URL,
		});
		await this.client.connect();
		this.client.on('error', (err) => console.log('Redis Client Error', err));
	}

	/**
	 * @returns Length of the list after the push operation.
	 */
	static async listRightPush(key: string, value: string) {
		return RedisService.client.rPush(key, value);
	}

	/**
	 * @returns Length of the list after the push operation.
	 */
	static async getFullList(key: string) {
		return await RedisService.client.lRange(key, 0, -1);
	}
}
