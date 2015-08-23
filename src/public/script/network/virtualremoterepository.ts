import VirtualRemote from './virtualremote';

export default class VirtualRemoteRepository {
    remotes = new Map<string, VirtualRemote>();

    constructor(numPlayers: number) {
        for (let i = 0; i < numPlayers; i++) {
            let key = i.toString();
            this.remotes.set(key, new VirtualRemote(this, key));
        }
    }

    emitTo(id: string, title: string, body: any) {
        console.log(id);
        this.remotes.get(id).emit(title, body);
    }

    emitAll(title: string, body: any) {
        this.remotes.forEach(value => {
            if (title === 'ping') {
                console.log('ping to ' + value.identifier);
            }
            value.emit(title, body);
        });
    }
}
