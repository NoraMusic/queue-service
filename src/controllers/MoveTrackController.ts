import { FastifyReply, FastifyRequest } from 'fastify';
import Controller from '../core/extendeds/Controller';
import { TMoveTrackReq } from '../core/types/requests';
import QueueService from '../core/services/QueueService';
import { Api404Exception, Api500Exception } from '../core/extendeds/Exception';

/**
 * POST / Move track into specific index
 * @requires guildId as a param
 * @requires trackId as a param
 * @requires index as a body { index: number }
 */
class MoveTrackController extends Controller {
	get schema() {
		return {
			params: {
				type: 'object',
				properties: {
					guildId: { type: 'string', minLength: 18, maxLength: 18, pattern: '^[0-9]+$' },
					uuid: { type: 'string' },
				},
			},
			body: {
				type: 'object',
				required: ['index'],
				properties: {
					index: { type: 'number' },
				},
			},
			response: {
				200: {},
				404: {},
			},
		};
	}

	async handler(req: FastifyRequest<TMoveTrackReq>, res: FastifyReply) {
		const { guildId, trackId } = req.params;
		const desiredIndex: number = req.body.index;

		const result: boolean | undefined = await QueueService.moveTrackToIndex(guildId, trackId, desiredIndex);
		if (result === false) throw new Api500Exception('Cache is offline.');

		if (result === undefined) {
			throw new Api404Exception();
		} else {
			res.code(200);
		}
	}
}

export default new MoveTrackController();
