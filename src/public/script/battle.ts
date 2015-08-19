import Snapshot from './snapshot';
import SnapshotFactory from './snapshotfactory';
import InputRepository from './input/inputrepository';
import LocalControllerFactory from './input/localcontrollerfactory';
import RemoteControllerRepository from './input/remotecontrollerrepository';
import Renderer from './renderer';
import Network from './network/starnetwork';

export default class Battle {
    private snapshots: Snapshot[] = [];
    private inputRepository: InputRepository;
    private renderer: Renderer;

    constructor(game: Phaser.Game, network: Network, numPlayers: number) {
        this.inputRepository = new InputRepository(
            numPlayers,
            new LocalControllerFactory(game.input, 0),
            network,
            new RemoteControllerRepository());
        this.renderer = new Renderer(game.debug, numPlayers);
    }

    update() {
        // すべて整ったらフレームを更新
        let input = this.inputRepository.peek();
        if (input == null) {
            return;
        }
        this.snapshots.push(SnapshotFactory.create(
            peek(this.snapshots),
            input));
        this.inputRepository.next();
    }

    render() {
        if (peek(this.snapshots) == null) {
            return;
        }
        this.renderer.render(peek(this.snapshots));
    }
}

function peek<T>(array: Array<T>) {
    return array[array.length - 1];
}
