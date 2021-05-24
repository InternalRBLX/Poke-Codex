import { RunFunction } from '../../Interfaces/Event';
import * as File from '../.././config/config.json';

export const name: string = 'uncaughtException';
export const run: RunFunction = async (client): Promise<void> => {
	client.destroy();
	client.logger.error('an error has occurred! Restarting the bot...');

	setTimeout(function () {
		client.login(File.token);
		client.logger.success('Bot is back online!');
	}, 10000);
};
