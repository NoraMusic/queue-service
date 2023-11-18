import { FastifyReply, FastifyRequest } from 'fastify';
import Controller from '../core/extendeds/Controller';
import { TGetQueueReq } from '../core/types/requests';
import QueueService from '../core/services/QueueService';
import { Api500Exception } from '../core/extendeds/Exception';

/**
 * DELETE / Remove every song from queue
 * @requires guildId as a param
 */
class ClearQueueController extends Controller {
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
				204: {
					description: 'Successfully deleted items',
				},
			},
		};
	}

	public async handler(req: FastifyRequest<TGetQueueReq>, res: FastifyReply) {
		const { guildId } = req.params;

		const result: number | false = await QueueService.clearQueue(guildId);
		if (!result) throw new Api500Exception('Cache is offline.');

		res.code(204);
	}
}

export default new ClearQueueController();
