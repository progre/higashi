import Network from '../network/starnetwork';
import Input from './input';
import Controller from './controller';
import LocalControllerFactory from './localcontrollerfactory';
import RemoteControllerRepository from './remotecontrollerrepository';

export default class InputRepository {
    private frame = 0;
    private localControllerCache: Controller[] = [];
    private remoteControllerPlayers: number[] = [];

    constructor(
        private numPlayers: number,
        private localControllerFactory: LocalControllerFactory,
        private network: Network,
        private remoteControllerRepository: RemoteControllerRepository,
        private delay: number
        ) {
        for (let i = 0; i < numPlayers; i++) {
            if (i !== network.localPlayer) {
                this.remoteControllerPlayers.push(i);
            }
        }
        for (let i = 0; i < delay; i++) {
            this.localControllerCache.push(Controller.empty());
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
        this.localControllerCache.shift();
    }

    private localController() {
        if (this.localControllerCache.length > this.delay) {
            return this.localControllerCache[0];
        }
        this.localControllerCache.push(this.localControllerFactory.create());
        this.network.emitController(this.frame, this.localControllerCache[this.localControllerCache.length - 1]);
        return this.localControllerCache[0];
    }
}
