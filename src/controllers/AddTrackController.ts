import { FastifyReply, FastifyRequest } from 'fastify';
import Controller from '../core/extendeds/Controller';
import { TAddSongReq } from '../core/types/requests';
import TTrackInfo from '../core/types/TTrackInfo';
import QueueService from '../core/services/QueueService';
import { Api500Exception } from '../core/extendeds/Exception';

/**
 * POST / Add track to queue
 * @requires guildId as a param & TrackInfo type in the body
 */
class AddTrackController extends Controller {
	get schema() {
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

	public async handler(req: FastifyRequest<TAddSongReq>, res: FastifyReply) {
		const { guildId } = req.params;
		const track: TTrackInfo = {
			name: req.body.name,
			url: req.body.url,
			thumbnail: req.body.thumbnail,
			search_type: req.body.search_type,
		};
		const result: string | false = await QueueService.addSong(track, guildId);
		if (!result) {
			throw new Api500Exception('Cache is offline.');
		}
		res.code(201).send({ uuid: result });
	}
}

export default new AddTrackController();
