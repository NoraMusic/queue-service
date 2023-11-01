import fastify, { FastifyInstance, RouteGenericInterface } from 'fastify';
import Application from './Application';
import TRoute from './types/TRoute';
import RedisService from './services/RedisService';

export default class Server {
	public readonly application: Application;
	public readonly fastify: FastifyInstance;

	constructor(app: Application) {
		this.application = app;
		this.fastify = fastify({
			logger: true,
		});
	}

	public static async start(): Promise<void> {
		await this.initApplication().initServer().run();
	}

	private static initApplication(): Server {
		const app = new Application();
		return new this(app);
	}

	private initServer(): Server {
		this.fastify.log.info('Initializing Routes.');
		this.initRoutes();
		return this;
	}

	private async run(): Promise<void> {
		try {
			await RedisService.connect();
			await this.fastify.listen({ port: this.application.port });
		} catch (error) {
			this.fastify.log.error(error);
			process.exit(1);
		}
	}

	protected initRoutes(): void {
		this.application.routes.forEach((route: TRoute) => {
			this.fastify.route(route);
		});
	}
}
