import { RunFunction } from '../../Interfaces/Event';

export const name: string = 'ready';
export const run: RunFunction = async (client): Promise<void> => {
	client.logger.success(`${client.user.tag} is now online!`);
};
