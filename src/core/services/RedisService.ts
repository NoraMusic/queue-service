import { RedisClientType, createClient } from 'redis';

export default class RedisService {
	private static readonly REDIS_URL: string = 'redis://default:redis@redis.local:6379';
	public static client: RedisClientType;
	public static isRedisOnline: boolean = false;

	static async connect() {
		this.client = createClient({
			url: this.REDIS_URL,
		});
		this.registerEvents();
		await this.client.connect();
	}

	private static registerEvents() {
		this.client.on('ready', () => (this.isRedisOnline = true));
		this.client.on('error', (err) => {
			this.isRedisOnline = false;
			if (
				(err instanceof Error && err.message === 'Socket closed unexpectedly') ||
				err.message === 'Connection timeout'
			) {
				this.isRedisOnline = false;
			}
			console.log('Redis Client Error', err);
		});
	}

	/**
	 * @returns Length of the list after the push operation.
	 */
	static async listRightPush(key: string, value: string): Promise<number | false> {
		if (!this.isRedisOnline) return false;
		return RedisService.client.rPush(key, value);
	}

	/**
	 * @returns Key list array
	 */
	static async getFullList(key: string): Promise<string[] | false> {
		if (!this.isRedisOnline) return false;
		return await RedisService.client.lRange(key, 0, -1);
	}
}
