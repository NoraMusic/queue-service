import { AddTrackController, GetQueueController, RemoveTrackController } from '../controllers/index';
import TRoute from '../core/types/TRoute';

const routes: Array<TRoute> = [
	{
		method: 'GET',
		url: '/api/queue/:guildId',
		schema: GetQueueController.schema,
		handler: GetQueueController.handler,
	},
	///
	{
		method: 'POST',
		url: '/api/queue/:guildId/tracks',
		schema: AddTrackController.schema,
		handler: AddTrackController.handler,
	},
	{
		method: 'DELETE',
		url: '/api/queue/:guildId/tracks/:trackId',
		schema: RemoveTrackController.schema,
		handler: RemoveTrackController.handler,
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
