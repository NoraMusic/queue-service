import { FastifyReply, FastifyRequest } from 'fastify';
import Controller from '../core/extendeds/Controller';
import { TRemoveTrackReq } from '../core/types/requests';
import QueueService from '../core/services/QueueService';
import { Api500Exception } from '../core/extendeds/Exception';

/**
 * DELETE / Remove specific track from queue by ids
 * @requires guildId as a param
 * @requires trackId as a param
 */
class RemoveTrackController extends Controller {
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
						message: { type: 'string' },
					},
				},
			},
		};
	}

	async handler(req: FastifyRequest<TRemoveTrackReq>, res: FastifyReply) {
		const { guildId, trackId } = req.params;
		const result: number | false = await QueueService.removeTrack(guildId, trackId);
		if (!result) throw new Api500Exception('Cache is offline.');

		res.code(204);
	}
}

export default new RemoveTrackController();
