/// <reference path="./typings.d.ts" />
import Battle from './battle';
import Network from './network/starnetwork';

let numPlayers = 2;
let battle: Battle;
let isServer = location.search === '?server';

let game = new Phaser.Game(640, 360, Phaser.AUTO, '', {
    preload() {
    },

    create() {
        console.log(isServer, location.search);
        Network.new(isServer, numPlayers).then(network => {
            battle = new Battle(game, network, numPlayers);
        });
    },

    update() {
        if (battle == null) {
            return;
        }
        battle.update();
    },

    render() {
        if (battle == null) {
            return;
        }
        battle.render();
    }
});
