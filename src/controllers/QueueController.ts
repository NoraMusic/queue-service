import { FastifyReply } from 'fastify';
import RedisService from '../core/services/RedisService';
import TAddSongRequest from '../core/types/requests/TAddSongRequest';
import { Api400Exception } from '../core/extendeds/Exception';

export default class QueueController {
	private static readonly _cache: RedisService = RedisService;

	static get schema() {
		return {
			params: {
				guildId: { type: 'string' },
			},
			response: {
				200: {
					type: 'object',
					properties: {
						hello: { type: 'string' },
					},
				},
			},
		};
	}

	/**
	 * Put song into queue POST
	 * @requires guildId in the url & TrackInfo in the body
	 */
	public static async AddSongController(req: TAddSongRequest, res: FastifyReply) {
		const { guildId } = req.params;
		if (guildId === '') {
			throw new Api400Exception('Missing guild ID in the url.');
		}
		res.code(200).send({ hello: guildId });
	}
}
