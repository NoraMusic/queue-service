import { FastifyReply, FastifyRequest } from 'fastify';
import { TAddSongReq, TGetQueueReq, TRemoveTrackReq } from '../core/types/requests';
import QueueService from '../core/services/QueueService';
import TTrackInfo from '../core/types/TTrackInfo';
import { Api500Exception } from '../core/extendeds/Exception';
import TQueueItem from '../core/types/TQueueItem';

export default class QueueController {
	static get addSongSchema() {
		return {
			params: {
				type: 'object',
				properties: {
					guildId: { type: 'string', minLength: 18, maxLength: 18, pattern: '^[0-9]+$' },
				},
			},
			body: {
				type: 'object',
				required: ['name', 'search_type'],
				properties: {
					name: { type: 'string' },
					url: { anyOf: [{ type: 'string' }, { type: 'null' }] },
					thumbnail: { anyOf: [{ type: 'string' }, { type: 'null' }] },
					search_type: { enum: ['search', 'url'] },
				},
			},
			response: {
				201: {
					type: 'object',
					properties: {
						uuid: { type: 'string' },
					},
				},
			},
		};
	}

	/**
	 * Put song into queue POST
	 * @requires guildId in the url & TrackInfo in the body
	 */
	public static async addSongController(req: FastifyRequest<TAddSongReq>, res: FastifyReply) {
		const { guildId } = req.params;
		const track: TTrackInfo = {
			name: req.body.name,
			url: req.body.url,
			thumbnail: req.body.thumbnail,
			search_type: req.body.search_type,
		};
		const result: string | false = await QueueService.addSong(track, guildId);
		if (!result) {
			throw new Api500Exception('Cache is offline.');
		}
		res.code(201).send({ uuid: result });
	}

	static get getQueueSchema() {
		return {
			params: {
				type: 'object',
				properties: {
					guildId: { type: 'string', minLength: 18, maxLength: 18, pattern: '^[0-9]+$' },
				},
			},
			response: {
				200: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							uuid: { type: 'string' },
							track: {
								type: 'object',
								properties: {
									name: { type: 'string' },
									url: { anyOf: [{ type: 'string' }, { type: 'null' }] },
									thumbnail: { anyOf: [{ type: 'string' }, { type: 'null' }] },
									search_type: { enum: ['search', 'url'] },
								},
							},
						},
					},
				},
			},
		};
	}

	/**
	 * Get queue GET
	 * @requires guildId in the url
	 */
	public static async getQueueController(req: FastifyRequest<TGetQueueReq>, res: FastifyReply) {
		const { guildId } = req.params;
		const result: TQueueItem[] | false = await QueueService.getQueue(guildId);
		if (!result) throw new Api500Exception('Cache is offline.');
		res.code(200).send(result);
	}

	static get removeTrackSchema() {
		return {
			params: {
				type: 'object',
				properties: {
					guildId: { type: 'string', minLength: 18, maxLength: 18, pattern: '^[0-9]+$' },
					uuid: { type: 'string' },
				},
			},
			response: {
				200: {
					type: 'object',
					properties: {
						message: { type: 'string' },
					},
				},
			},
		};
	}

	/**
	 * Remove track from queue DELETE
	 * @requires guildId in the url
	 * @requires trackId in the url
	 */
	public static async removeTrackController(req: FastifyRequest<TRemoveTrackReq>, res: FastifyReply) {
		const { guildId, trackId } = req.params;
		const result: number | false = await QueueService.removeTrack(guildId, trackId);
		if (!result) throw new Api500Exception('Cache is offline.');

		res.code(204);
	}
}
