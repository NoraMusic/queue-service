import { FastifyReply, FastifyRequest } from 'fastify';
import TAddSongRequest from '../core/types/requests/TAddSongRequest';
import QueueService from '../core/services/QueueService';
import TTrackInfo from '../core/types/TTrackInfo';
import { Api500Exception } from '../core/extendeds/Exception';

export default class QueueController {
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
				201: {
					type: 'object',
					properties: {
						uuid: { type: 'string' },
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
		const track: TTrackInfo = {
			name: req.body.name,
			url: req.body.url,
			thumbnail: req.body.thumbnail,
			search_type: req.body.search_type,
		};
		const result: string | false = await QueueService.addSong(track, guildId);
		if (!result) {
			throw new Api500Exception('here');
		}
		res.code(201).send({ uuid: result });
	}
}
