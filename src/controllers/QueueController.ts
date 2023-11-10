import { FastifyReply, FastifyRequest } from 'fastify';
import RedisService from '../core/services/RedisService';
import TAddSongRequest from '../core/types/requests/TAddSongRequest';

export default class QueueController {
	private static readonly _cache: RedisService = RedisService;

	static get AddSongSchema() {
		return {
			params: {
				type: 'object',
				properties: {
					guildId: { type: 'string', minLength: 18, maxLength: 18, pattern: '^[0-9]+$' },
				},
			},
			body: {
				type: 'object',
				required: ['name', 'search_type'],
				properties: {
					name: { type: 'string' },
					url: { anyOf: [{ type: 'string' }, { type: 'null' }] },
					thumbnail: { anyOf: [{ type: 'string' }, { type: 'null' }] },
					search_type: { enum: ['search', 'url'] },
				},
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
	public static async AddSongController(req: FastifyRequest<TAddSongRequest>, res: FastifyReply) {
		const { guildId } = req.params;
		console.log(req.body);
		res.code(200).send({ hello: guildId });
	}
}
