/// <reference path="./typings.d.ts" />
export default function io(io: SocketIO.Server) {
    let fight = io.of('/fight');
    let roomName = 'test';
    let room = fight.to(roomName);

    fight.on('connect', socket => {
        socket.join(roomName);
        socket.on('message', (msg: any) => {
            if (msg.id == null) {
                room.emit('message', msg);
            } else {
                room.sockets.filter(x => x.id === msg.id)
                    .forEach(remote => {
                        remote.emit('message', msg);
                    });
            }
        });
    });
}
