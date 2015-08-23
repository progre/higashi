import Controller from './controller';

export default class Input {
    static empty(numPlayers: number) {
        let list: Controller[] = [];
        for (let i = 0; i < numPlayers; i++) {
            list.push(Controller.empty());
        }
        return new Input(list);
    }

    constructor(
        public controllers: Controller[]) {
    }

    equals(obj: Input) {
        return this.controllers.length === obj.controllers.length
            && this.controllers.every((value, i) => value.equals(obj.controllers[i]));
    }
}
