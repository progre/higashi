import Controller from './controller';

export default class LocalControllerFactory {
	up: Phaser.Key;
	down: Phaser.Key;
	left: Phaser.Key;
	right: Phaser.Key;

	constructor(private input: Phaser.Input) {
		this.up = this.input.keyboard.addKey(Phaser.Keyboard.W);
		this.down = this.input.keyboard.addKey(Phaser.Keyboard.S);
		this.left = this.input.keyboard.addKey(Phaser.Keyboard.A);
		this.right = this.input.keyboard.addKey(Phaser.Keyboard.D);
	}

	create() {
		return new Controller(
			this.up.isDown,
			this.down.isDown,
			this.left.isDown,
			this.right.isDown);
	}
}
