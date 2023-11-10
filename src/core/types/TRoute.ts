import { HTTPMethods, FastifyRequest, FastifyReply } from 'fastify';

type TRoute = {
	method: HTTPMethods;
	url: string;
	schema?: object;
	preHandler?: () => unknown;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handler: (req: FastifyRequest<any>, res: FastifyReply) => void;
};

export default TRoute;
