import { RunFunction } from '../../Interfaces/Event';
import { Command } from '../.././Interfaces/Command';
import { Message } from 'discord.js';
import * as File from '../.././config/config.json';

export const name: string = 'message';
export const run: RunFunction = async (client, message: Message) => {
	if (
		message.author.bot ||
		!message.guild ||
		!message.content.toLowerCase().startsWith(File.prefix)
	)
		return;

	const args: string[] = message.content
		.slice(File.prefix.length)
		.trim()
		.split(/ +/g);
	const cmd: string = args.shift();
	const command: Command =
		client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
	if (!command) return;

	command
		.run(client, message, args)
		.catch((reason) => {
			message.channel.send(
				client.embed({ description: `An Error Came: ${reason}` }, message)
			);
			return client.logger.error(reason);
		});
};
