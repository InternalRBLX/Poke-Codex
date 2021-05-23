import { Move } from './Move';
import moment, { Moment } from 'moment';

export class Pokemon {
	public name: string;
	public nick: string;
	public index: number;
	public caughtIn: string;
	public element: string;
	public item: string | null;
	public currentLevel: number;
	public totalXP: number;
	public moves: Move[];
	public ability: string;
	public abilitySlot: number;
	public nature: string;
	public stats: number[];
	public IVs: number[];
	public EVs: number[];
	public gender: string;
	public ot: string = 'None';
	public otid: number = 0;
	public date: string;
	public region: string;
	public location: string;
	public caughtAtLevel: number;
	public shiny: boolean;
	public lead: number = 0;
	public form: string;
	public friendship: number = 50;
	public evolving: number = 0;
	public status: null = null;
	public pv: number;

	constructor(
		name: string,
		nick: string,
		index: number,
		form: string,
		element: string,
		item: string | null,
		currentLevel: number,
		totalXP: number,
		moves: Move[],
		ability: string,
		abilitySlot: number,
		nature: string,
		stats: number[],
		iv: number[],
		ev: number[],
		gender: string,
		region: string,
		location: string,
		caughtAtLevel: number,
		shiny: boolean
	) {
		this.date = moment().format();
		this.name = name;
		this.nick = nick;
		this.index = index;
		this.caughtIn = 'Poké Ball';
		this.element = element;
		this.item = item;
		this.currentLevel = currentLevel;
		this.totalXP = totalXP;
		this.moves = moves;
		this.ability = ability;
		this.abilitySlot = abilitySlot;
		this.nature = nature;
		this.stats = stats;
		this.IVs = iv;
		this.EVs = ev;
		this.gender = gender;
		this.region = region;
		this.location = location;
		this.caughtAtLevel = caughtAtLevel;
		this.shiny = shiny;
		this.form = form;
		this.pv = Math.floor(Math.random() * 4294967296);
	}
}
