import Network from '../network/starnetwork';
import Input from './input';
import Controller from './controller';
import LocalControllerFactory from './localcontrollerfactory';
import RemoteControllerRepository from './remotecontrollerrepository';

export default class InputRepository {
    private frame = 0;
    private localControllerCache: Controller;
    private remoteControllerPlayers: number[] = [];

    constructor(
        private numPlayers: number,
        private localControllerFactory: LocalControllerFactory,
        private network: Network,
        private remoteControllerRepository: RemoteControllerRepository
        ) {
        for (let i = 0; i < numPlayers; i++) {
            if (i !== network.localPlayer) {
                this.remoteControllerPlayers.push(i);
            }
        }
    }

    peek() {
        let controllers: Controller[] = [];
        controllers[this.network.localPlayer] = this.localController();
        this.remoteControllerPlayers.forEach(player => {
            controllers[player] = this.remoteControllerRepository.get(player, this.frame);
        });
        if (controllers.some(x => x == null)) {
            return null;
        }
        return new Input(controllers);
    }

    next() {
        this.frame++;
        this.localControllerCache = null;
    }

    private localController() {
        if (this.localControllerCache != null) {
            return this.localControllerCache;
        }
        this.localControllerCache = this.localControllerFactory.create();
        this.network.emitController(this.frame, this.localControllerCache);
        return this.localControllerCache;
    }
}
