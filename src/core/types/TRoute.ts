import { HTTPMethods, FastifyRequest, FastifyReply } from 'fastify';

type TRoute = {
	method: HTTPMethods;
	url: string;
	schema?: object;
	preHandler?: () => unknown;
	handler: (req: FastifyRequest, res: FastifyReply) => void;
};

export default TRoute;
