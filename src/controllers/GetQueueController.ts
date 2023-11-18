import { FastifyReply, FastifyRequest } from 'fastify';
import Controller from '../core/extendeds/Controller';
import QueueService from '../core/services/QueueService';
import { Api500Exception } from '../core/extendeds/Exception';
import { TGetQueueReq } from '../core/types/requests';
import TQueueItem from '../core/types/TQueueItem';

/**
 * GET \ Get all songs in queue
 * @requires guildId as a param
 */
class GetQueueController extends Controller {
	get schema() {
		return {
			params: {
				type: 'object',
				properties: {
					guildId: { type: 'string', minLength: 18, maxLength: 18, pattern: '^[0-9]+$' },
				},
			},
			response: {
				200: {
					type: 'array',
					items: {
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
				},
			},
		};
	}

	async handler(req: FastifyRequest<TGetQueueReq>, res: FastifyReply) {
		const { guildId } = req.params;
		const result: TQueueItem[] | false = await QueueService.getQueue(guildId);
		if (!result) throw new Api500Exception('Cache is offline.');
		res.code(200).send(result);
	}
}

export default new GetQueueController();
