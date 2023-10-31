import QueueController from '../controllers/QueueController';
import TRoute from '../core/types/TRoute';

const routes: Array<TRoute> = [
	{
		method: 'GET',
		url: '/api',
		schema: QueueController.schema,
		handler: QueueController.handler,
	},
];

export default routes;
