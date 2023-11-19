import { FastifyReply, FastifyRequest } from 'fastify';
import Controller from '../core/extendeds/Controller';
import { TRemoveTrackReq } from '../core/types/requests';
import QueueService from '../core/services/QueueService';
import { Api404Exception, Api500Exception } from '../core/extendeds/Exception';
import TQueueItem from '../core/types/TQueueItem';

/**
 * GET / Get specific track information by id
 * @requires guildId as a param
 * @requires trackId as a param
 */
class GetTrackController extends Controller {
	get schema() {
		return {
			params: {
				type: 'object',
				properties: {
					guildId: { type: 'string', minLength: 18, maxLength: 18, pattern: '^[0-9]+$' },
					uuid: { type: 'string' },
				},
			},
			response: {
				200: {
					type: 'object',
					properties: {
						uuid: { type: 'string' },
						track: {
							type: 'object',
							properties: {
								name: { type: 'string' },
								url: { anyOf: [{ type: 'string' }, { type: 'null' }] },
								thumbnail: { anyOf: [{ type: 'string' }, { type: 'null' }] },
								search_type: { enum: ['search', 'url'] },
							},
						},
					},
				},
				404: {},
			},
		};
	}

	async handler(req: FastifyRequest<TRemoveTrackReq>, res: FastifyReply) {
		const { guildId, trackId } = req.params;
		const result: TQueueItem | undefined | false = await QueueService.getTrack(guildId, trackId);
		if (result === false) throw new Api500Exception('Cache is offline.');

		if (result === undefined) {
			throw new Api404Exception();
		} else {
			res.code(200).send(result);
		}
	}
}

export default new GetTrackController();
