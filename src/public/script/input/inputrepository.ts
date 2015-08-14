import Input from './input';
import Controller from './controller';
import InputFactory from './inputfactory';

export default class InputRepository {
	/** 現在のフレーム */
	private index = 0;
	private inputFactories: InputFactory[] = [];
	private inputs: Input[] = [];

	constructor(private numPlayers: number) {
	}

	putController(frame: number, player: number, controller: Controller) {
		if (this.inputs[frame] != null) {
			throw new Error('Frame is already created.');
		}
		let inputFactory = getOrCreate(this.numPlayers, this.inputFactories, frame);
		inputFactory.putController(player, controller);
		if (inputFactory.filled()) {
			this.inputs[frame] = inputFactory.create();
			this.inputFactories[frame] = null;
		}
	}

	peek() {
		return this.inputs[this.index];
	}

	shift() {
		let value = this.peek();
		if (value != null) {
			this.index++;
		}
		return value;
	}

	dump() {
		return this.inputs;
	}
}

function getOrCreate(numPlayers: number, inputFactories: InputFactory[], frame: number) {
	let inputFactory = inputFactories[frame];
	if (inputFactory != null) {
		return inputFactory;
	}
	return inputFactories[frame] = new InputFactory(numPlayers);
}
