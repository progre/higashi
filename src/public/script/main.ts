/// <reference path="./typings.d.ts" />
import Frame from './frame';
import FrameFactory from './framefactory';
import InputRepository from './input/inputrepository';
import LocalControllerFactory from './input/localcontrollerfactory';
import Renderer from './renderer';

let numPlayers = 2;

let frames: Frame[] = [];
let inputRepository = new InputRepository(numPlayers);
let player1: LocalControllerFactory;
let player2: LocalControllerFactory;
let renderer: Renderer;

let game = new Phaser.Game(640, 360, Phaser.AUTO, '', {
    preload() {
    },

    create() {
        player1 = new LocalControllerFactory(game.input, 0);
        player2 = new LocalControllerFactory(game.input, 1);
        renderer = new Renderer(game.debug, numPlayers);
    },

    update() {
        inputRepository.putController(
            frames.length,
            0,
            player1.create());
        inputRepository.putController(
            frames.length,
            1,
            player2.create());
        frames.push(FrameFactory.create(peek(frames), inputRepository.shift()));
    },

    render() {
        renderer.render(peek(frames));
    }
});

function peek<T>(array: Array<T>) {
    return array[array.length - 1];
}
