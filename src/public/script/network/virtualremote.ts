import VirtualRemoteRepository from './virtualremoterepository';
import * as ifes from './interfaces';

export default class VirtualRemote extends EventEmitter implements ifes.Remote {
    constructor(private repository: VirtualRemoteRepository, public identifier: string) {
        super();
        super.on('ping', () => {
            console.log('get ping ' + this.identifier);
        });
    }

    emitTo(id: string, title: string, body: any) {
        this.repository.emitTo(id, title, body);
    }

    emitAll(title: string, body: any) {
        this.repository.emitAll(title, body);
    }
}
