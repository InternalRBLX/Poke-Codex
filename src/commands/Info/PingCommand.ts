import { Message } from 'discord.js';
import { RunFunction } from '../../Interfaces/Command';

export const name: string = 'ping';
export const category: string = 'info';
export const aliases: string[] = ['pong'];
export const run: RunFunction = async (client, message: Message) => {
	const msg: Message = await message.channel.send(
		client.embed({ description: 'Pinging!!' }, message)
	);
	await msg.edit(
		client.embed(
			{
				description: `WebSocket: ${client.ws.ping}ms\nMessage edit: ${
					msg.createdTimestamp - message.createdTimestamp
				}ms`,
			},
			message
		)
	);
};
