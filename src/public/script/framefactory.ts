import Frame from './frame';
import Input from './input/input';
import InputFactory from './input/inputfactory';
import Player from './player';

export default class FrameFactory {
	static create(previous: Frame, input: Input) {
		if (previous == null) { // 最初のフレーム
			previous = initialFrame(input.controllers.length);
		}
		let players = previous.players.map((p, i) => {
			let ctrler = input.controllers[i];
			let x = p.x;
			if (ctrler.left) {
				x -= 1;
			}
			if (ctrler.right) {
				x += 1;
			}
			let y = p.y;
			if (ctrler.up) {
				y -= 1;
			}
			if (ctrler.down) {
				y += 1;
			}
			return new Player(x, y);
		});
		return new Frame(previous, input, players);
	}
}

function initialFrame(numPlayers: number) {
	let list: Player[] = [];
	for (let i = 0; i < numPlayers; i++) {
		list.push(new Player(0, 0));
	}
	return new Frame(
		null,
		InputFactory.emptyInput(numPlayers),
		list);
}
