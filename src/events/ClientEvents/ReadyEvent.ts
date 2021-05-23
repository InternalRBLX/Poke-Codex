import { RunFunction } from '../../Interfaces/Event';
import * as File from '../.././config/config.json';

export const name: string = 'ready';
export const run: RunFunction = async (client): Promise<void> => {
	client.user.setActivity('Poke-Codex (' + File.prefix + ')');
	client.logger.success(`${client.user.tag} is now online!`);
};
