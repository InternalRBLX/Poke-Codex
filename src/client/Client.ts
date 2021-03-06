import consola, { Consola } from 'consola';
import {
	Client,
	MessageEmbedOptions,
	Message,
	MessageEmbed,
	Intents,
	Collection,
	TextChannel,
} from 'discord.js';
import * as mysql from 'mysql';
import glob from 'glob';
import { Command } from '../Interfaces/Command';
import { Event } from '../Interfaces/Event';
import { Config } from '../Interfaces/Config';
import { promisify } from 'util';
import * as File from '../config/config.json';

const globPromise = promisify(glob);

class Bot extends Client {
	public logger: Consola = consola;
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public events: Collection<string, Event> = new Collection();
	public categories: Set<string> = new Set();
	public config: Config;

	public constructor() {
		super({
			ws: { intents: Intents.ALL },
			messageCacheLifetime: 180,
			messageCacheMaxSize: 200,
			messageEditHistoryMaxSize: 200,
			messageSweepInterval: 180,
		});
	}

	public async start(config: Config): Promise<void> {
		this.config = config;
		this.login(config.token);

		/* Loading/Running Commands */
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/**/*{.ts,.js}`
		);
		commandFiles.map(async (value: string) => {
			const file: Command = await import(value);
			this.commands.set(file.name, file);
			this.categories.add(file.category);

			if(file.aliases != null && file.aliases.length) {
				file.aliases.map((value: string) => this.aliases.set(value, file.name));
			}
		});

		/* Loading/Running Events */
		const eventFiles: string[] = await globPromise(
			`${__dirname}/../events/**/*{.ts,.js}`
		);
		eventFiles.map(async (value: string) => {
			const file: Event = await import(value);
			this.events.set(file.name, file);
			this.on(file.name, file.run.bind(null, this));
		});
	}

	public async sendMessage(
		channel: TextChannel,
		content: string
	): Promise<Message> {
		return channel.send(content);
	}

	public embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
		return new MessageEmbed({ ...options, color: 'RANDOM' }).setFooter(
			`${message.author.tag} | ${this.user.username}`,
			message.author.displayAvatarURL({ format: 'png', dynamic: true })
		);
	}

	public async sendMessageWithAttachments(
		channel: TextChannel,
		content: MessageEmbed,
		attachments: any[]
	): Promise<MessageEmbed> {
		let message = null;
		await channel
			.send({ embed: content, files: attachments })
			.then((msg) => {
				message = msg;
			})
			.catch((err) => {
				this.logger.error('Failed to send message: ' + err);
			});

		return message;
	}
}

export { Bot };
