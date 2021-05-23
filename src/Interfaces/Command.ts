import { Bot } from '../client/Client';
import { Message } from 'discord.js';

export interface RunFunction {
	(client: Bot, message: Message, args: string[]): Promise<void>;
}

export interface Command {
	name: string;
	category: string;
	run: RunFunction;
}
