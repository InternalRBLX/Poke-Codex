export interface Move {
	index_number: number;
	name: string;
	type: string;
	pp: number;
	max_pp: number;
	power: number;
	accuracy: number;
	category: string;
	priority: number;
	critical_hit: number;
	target: number;
	makes_contact: boolean;
	affected_by_protect: boolean;
	affected_by_magic_coat: boolean;
	affected_by_snatch: boolean;
	affected_by_mirror_move: boolean;
	affected_by_kings_rock: boolean;
	description: string;
}
