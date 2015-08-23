/// <reference path="./typings.d.ts" />
import Battle from './battle';
import Network from './network/starnetwork';
import Remote from './network/socketioremote';
import FPSCounter from './debug/fpscounter';

let numPlayers = 2;
let battle: Battle;
let isServer = location.search === '?server';
let fpsCounter = new FPSCounter();

let game = new Phaser.Game(640, 360, Phaser.AUTO, '', {
    preload() {
    },

    create() {
        console.log(isServer, location.search);
        Remote.new().then(remote => {
            Network.new(remote, isServer, numPlayers).then(network => {
                battle = new Battle(game, network, numPlayers);
            });
        });
    },

    update() {
        performance.mark('begin');
        fpsCounter.tick();
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
