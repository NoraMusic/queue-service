import { FastifyReply, FastifyRequest } from 'fastify';

export default abstract class Controller {
	abstract get schema(): object;
	abstract handler(req: FastifyRequest<never>, res: FastifyReply): void;
}
