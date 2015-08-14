import Input from './input/input';
import Player from './player';

export default class Frame {
	constructor(
		public previous: Frame,
		public input: Input,
		public players: Player[]) {
	}
}
