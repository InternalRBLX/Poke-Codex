import { Bot } from '../client/Client';
import { Message } from 'discord.js';

export interface RunFunction {
	(client: Bot, message: Message, args: string[]): Promise<unknown>;
}

export interface Command {
	name: string;
	category: string;
	aliases?: string[];
	run: RunFunction;
}
