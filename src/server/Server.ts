import { Bot } from '.././client/Client';
import { Config } from '../Interfaces/Config';
import { Datastore } from '../DS/Datastore';
import * as mysql from 'mysql';
import * as File from '../config/config.json';

export class Server {
	constructor(BotClient: Bot) {
		this.start(BotClient);
	}

	public start(BotClient: Bot) {
		Datastore.start(BotClient);
		BotClient.start(File as Config);
		this.connections(BotClient);
	}

	public connections(BotClient: Bot) {
		process.on('error', (error) => {
			BotClient.destroy();
			BotClient.logger.error(error);
			this.restart(BotClient);
		});

		process.on('unhandledRejection', (error) => {
			BotClient.destroy();
			BotClient.logger.error(error);
			this.restart(BotClient);
		});

		process.on('uncaughtException', (error) => {
			BotClient.destroy();
			BotClient.logger.error(error);
			this.restart(BotClient);
		});

		BotClient.on('error', (e) => {
			BotClient.logger.error(e);
			BotClient.destroy();
			this.restart(BotClient);
		});

		BotClient.on('warn', (e) => BotClient.logger.warn(e));
		BotClient.on('debug', (e) => BotClient.logger.info(e));
	}

	public restart(BotClient: Bot) {
		setTimeout(function () {
			BotClient.start(File as Config);
		}, 10000);
	}
}
