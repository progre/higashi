/// <reference path="./typings.d.ts" />
import Frame from './frame';
import FrameFactory from './framefactory';
import InputRepository from './input/inputrepository';
import LocalControllerFactory from './input/localcontrollerfactory';
import Renderer from './renderer';

let numPlayers = 1;

let frames: Frame[] = [];
let inputRepository = new InputRepository(numPlayers);
let localControllerFactory: LocalControllerFactory;
let renderer: Renderer;

let game = new Phaser.Game(640, 360, Phaser.AUTO, '', {
	preload() {
	},

	create() {
		localControllerFactory = new LocalControllerFactory(game.input);
		renderer = new Renderer(game.debug, numPlayers);
	},

	update() {
		inputRepository.putController(
			frames.length,
			0,
			localControllerFactory.create());
		frames.push(FrameFactory.create(peek(frames), inputRepository.shift()));
	},

	render() {
		renderer.render(peek(frames));
	}
});

function peek<T>(array: Array<T>) {
	return array[array.length - 1];
}
