import Controller from '../input/controller';
import Remote from './socketioremote';

export default class StarNetwork {
    static new(isServer: boolean, numPlayers: number) {
        return Remote.new().then(remote => new Promise<StarNetwork>((resolve, reject) => {
            if (isServer) {
                if (numPlayers === 1) {
                    resolve(new StarNetwork(remote, null, 0));
                    return;
                }
                let list = new Set<string>();
                remote.on('pong', (id: string) => {
                    list.add(id);
                    if (list.size + 1 === numPlayers) {
                        remote.removeAllListeners('pong');
                        resolve(new StarNetwork(remote, null, 0));
                    }
                });
                remote.emitAll('ping', remote.identifier);
            } else {
                remote.once('ping', (id: string) => {
                    remote.emitTo(id, 'pong', remote.identifier);
                    resolve(new StarNetwork(remote, id, -1));
                });
            }
        }));
    }

    constructor(
        private remote: Remote,
        private serverIdentifier: string,
        public localPlayer: number) {
    }

    emitController(frame: number, controller: Controller) {
        if (this.serverIdentifier == null) {
            this.remote.emitAll('controller', controller);
        } else {
            this.remote.emitTo(this.serverIdentifier, 'controller', controller);
        }
    }
}
