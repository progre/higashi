import Controller from '../input/controller';
import Remote from './socketioremote';

export default class StarNetwork extends EventEmitter {
    static new(isServer: boolean, numPlayers: number) {
        return Remote.new().then(remote => new Promise<StarNetwork>((resolve, reject) => {
            if (isServer) {
                // サーバーは'pong'が各クライアントから来れば開始可能
                // 'hello'が来たら'ping'を撃つ
                if (numPlayers === 1) {
                    resolve(new StarNetwork(remote, null, 0));
                    return;
                }
                let list = new Set<string>();
                remote.on('pong', (id: string) => {
                    console.log('<-pong');
                    list.add(id);
                    if (list.size + 1 === numPlayers) {
                        remote.removeAllListeners('pong');
                        remote.removeAllListeners('hello');
                        let i = 1;
                        list.forEach(targetId => {
                            console.log('->player');
                            remote.emitTo(
                                targetId,
                                'player',
                                { id: remote.identifier, player: i++ });
                        });
                        resolve(new StarNetwork(remote, null, 0));
                    }
                });
                remote.on('hello', () => {
                    console.log('<-hello');
                    remote.emitAll('ping', {});
                    console.log('->ping');
                });
                remote.emitAll('ping', remote.identifier);
                console.log('->ping');
            } else {
                // クライアントはサーバーのIDと自分の番号がわかれば開始可能
                remote.emitAll('hello', {});
                console.log('->hello');
                remote.on('ping', (id: string) => {
                    console.log('<-ping');
                    remote.emitTo(id, 'pong', remote.identifier);
                    console.log('->pong');
                });
                remote.once('player', (obj: { id: string; player: number; }) => {
                    console.log('<-player');
                    remote.removeAllListeners('ping');
                    resolve(new StarNetwork(remote, obj.id, obj.player));
                });
            }
        }));
    }

    constructor(
        private remote: Remote,
        private serverIdentifier: string,
        public localPlayer: number
        ) {
        super();
        remote.on('controller', (obj: { player: number; controller: Controller }) => {
            super.emit('controller', obj);
        });
    }

    emitController(frame: number, controller: Controller) {
        if (this.serverIdentifier == null) {
            this.remote.emitAll('controller', { player: this.localPlayer, frame, controller });
        } else {
            this.remote.emitTo(this.serverIdentifier, 'controller', { player: this.localPlayer, frame, controller });
        }
    }
}
