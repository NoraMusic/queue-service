import routes from '../routes';
import TRoute from './types/TRoute';

export default class Application {
	public readonly port: number = 4444;
	private IRoutes: Array<TRoute> = [];

	constructor() {
		this.IRoutes = routes;
	}

	get routes(): Array<TRoute> {
		return this.IRoutes;
	}
}
