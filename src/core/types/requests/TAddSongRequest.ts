import { FastifyRequest } from 'fastify';

type TAddSongRequest = FastifyRequest<{
	Params: { guildId: string };
}>;

export default TAddSongRequest;
