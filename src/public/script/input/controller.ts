export default class Controller {
	constructor(
		public up: boolean,
		public down: boolean,
		public left: boolean,
		public right: boolean
		) {
	}

	equals(obj: Controller) {
		return this.up === obj.up
			&& this.down === obj.down
			&& this.left === obj.left
			&& this.right === obj.right;
	}
}
