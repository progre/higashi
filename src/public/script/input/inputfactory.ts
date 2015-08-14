import Input from './input';
import Controller from './controller';

export default class InputFactory {
	private controllers: Controller[] = [];

	static emptyInput(numPlayers: number) {
		let list: Controller[] = [];
		for (let i = 0; i < numPlayers; i++) {
			list.push(new Controller(false, false, false, false));
		}
		return new Input(list);
	}

	constructor(numPlayers: number) {
		for (let i = 0; i < numPlayers; i++) {
			this.controllers.push(null);
		}
	}

	putController(player: number, controller: Controller) {
		if (this.controllers[player] != null) {
			throw new Error('Controller is already put.');
		}
		this.controllers[player] = controller;
	}

	filled() {
		return this.controllers.every(x => x != null);
	}

	create() {
		if (!this.filled()) {
			throw new Error('InputFactory is not filled.');
		}
		let input = new Input(this.controllers);
		this.controllers = null;
		return input;
	}
}
