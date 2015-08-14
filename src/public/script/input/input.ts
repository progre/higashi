import Controller from './controller';

export default class Input {
	constructor(
		public controllers: Controller[]) {
	}

	equals(obj: Input) {
		return this.controllers.length === obj.controllers.length
			&& this.controllers.every((value, i) => value.equals(obj.controllers[i]));
	}
}
