import Snapshot from './valueobject/snapshot';

export default class Renderer {
    players: Phaser.Circle[] = [];

    constructor(private debug: Phaser.Utils.Debug, numPlayers: number) {
        for (let i = 0; i < numPlayers; i++) {
            this.players.push(new Phaser.Circle(10, 10, 50));
        }
    }

    render(snapshot: Snapshot) {
        snapshot.players.forEach((model, i) => {
            let view = this.players[i];
            view.x = model.x;
            view.y = model.y;
            this.debug.geom(view, '#0fffff');
        });
    }
}
