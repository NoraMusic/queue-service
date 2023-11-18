import { FastifyReply, FastifyRequest } from 'fastify';
import Controller from '../core/extendeds/Controller';
import { TGetQueueReq } from '../core/types/requests';
import QueueService from '../core/services/QueueService';
import { Api500Exception } from '../core/extendeds/Exception';

/**
 * POST / Shuffle songs in queue
 * @requires guildId as a param
 */
class ShuffleQueueController extends Controller {
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

	public async handler(req: FastifyRequest<TGetQueueReq>, res: FastifyReply) {
		const { guildId } = req.params;

		const result: number | false = await QueueService.shuffleQueue(guildId);
		if (!result) throw new Api500Exception('Cache is offline.');

		res.code(200).send({ message: 'Shuffled queue.' });
	}
}

export default new ShuffleQueueController();
