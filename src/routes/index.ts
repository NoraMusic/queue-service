import QueueController from '../controllers/QueueController';
import TRoute from '../core/types/TRoute';

const routes: Array<TRoute> = [
	{
		method: 'GET',
		url: '/api/queue/:guildId',
		schema: QueueController.getQueueSchema,
		handler: QueueController.getQueueController,
	},
	///
	{
		method: 'POST',
		url: '/api/queue/:guildId/tracks',
		schema: QueueController.addSongSchema,
		handler: QueueController.addSongController,
	},
	{
		method: 'DELETE',
		url: '/api/queue/:guildId/tracks/:trackId',
		schema: QueueController.removeTrackSchema,
		handler: QueueController.removeTrackController,
	},
];

export default routes;

/**
 * ENDPOINTS DEV
 * *** GET /api/queue/:guildId Get all songs in queue
 * DELETE /api/queue/:guildId Remove every song from queue
 * POST /api/queue/:guildId/shuffle Shuffle songs in queue
 *
 * *** POST /api/queue/:guildId/tracks/ Add track to queue
 * *** DELETE /api/queue/:guildId/tracks/:id Remove specific track from queue by ids
 * GET /api/queue/:guildId/tracks/:id Get specific track information by id
 * POST /api/queue/:guildId/tracks/:id/move Move track into specific index
 */
