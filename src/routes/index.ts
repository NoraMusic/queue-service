import QueueController from '../controllers/QueueController';
import TRoute from '../core/types/TRoute';

const routes: Array<TRoute> = [
	// {
	// 	method: 'GET',
	// 	url: '/api/queue/:guildId',
	// 	//schema: QueueController.schema,
	// 	handler: QueueController.handler,
	// },
	{
		method: 'POST',
		url: '/api/queue/:guildId',
		schema: QueueController.schema,
		handler: QueueController.AddSongController,
	},
];

export default routes;
