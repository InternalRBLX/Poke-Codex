import * as mysql from 'mysql';
import { Bot } from '../client/Client';
import * as File from '../config/config.json';

export namespace Datastore {
	const con: mysql.Connection = mysql.createConnection(File['database_data']);
	let BotClient: Bot;

	export function start(client: Bot) {
		BotClient = client;

		con.connect(function (err) {
			if (err) {
				BotClient.logger.error(err);
				process.exit();
			}

			console.log('Connected to MySQL Database.');
		});
	}

	export function DoQuery(query, variables) {
		return new Promise(async (resolve, reject) => {
			await con.query(query, variables, function (err, result) {
				if (err) {
					con.rollback(function () {
						BotClient.logger.error(err);
					});
					reject(null);
				} else {
					resolve(result);
				}
			});
		});
	}
}
