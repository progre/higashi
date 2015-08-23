import * as ifes from './interfaces';

export default class SocketIORemote extends EventEmitter implements ifes.Remote {
    static new() {
        return new Promise<SocketIORemote>((resolve, reject) => {
            let socket = io();
            socket.nsp = '/fight';
            socket.once('connect', (serverClient: string) => {
                resolve(new SocketIORemote(socket));
            });
            socket.open();
        });
    }

    constructor(private socket: SocketIOClient.Socket) {
        super();
        socket.on('message', (msg: any) => {
            super.emit(msg.title, msg.body);
        });
    }

    emitTo(id: string, title: string, body: any) {
        this.socket.emit('message', { id, title, body });
    }

    emitAll(title: string, body: any) {
        this.socket.emit('message', { id: null, title, body });
    }

    get identifier() {
        return this.socket.id;
    }
}
