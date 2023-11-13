import QueueController from '../controllers/QueueController';
import TRoute from '../core/types/TRoute';

const routes: Array<TRoute> = [
	{
		method: 'GET',
		url: '/api/queue/:guildId',
		schema: QueueController.getQueueSchema,
		handler: QueueController.getQueueController,
	},
	{
		method: 'POST',
		url: '/api/queue/:guildId',
		schema: QueueController.addSongSchema,
		handler: QueueController.addSongController,
	},
];

export default routes;
