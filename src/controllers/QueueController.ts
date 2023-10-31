import { FastifyRequest, FastifyReply } from 'fastify';

export default class QueueController {
	static get schema() {
		return {
			querystring: {
				name: { type: 'string' },
				excitement: { type: 'integer' },
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

	public static handler(req: FastifyRequest, res: FastifyReply) {
		res.code(200).send({ message: 'Hello world' });
	}
}
