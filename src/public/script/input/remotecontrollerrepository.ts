import Controller from './controller';

export default class RemoteControllerRepository {
    controllers: Controller[][] = [];

    put(player: number, frame: number, controller: Controller) {
        getOrCreate(this.controllers, player, [])[frame] = controller;
    }

    get(player: number, frame: number) {
        return getOrCreate(this.controllers, player, [])[frame];
    }
}

function getOrCreate<T>(array: T[], index: number, defaultValue: T) {
    let item = array[index];
    if (item != null) {
        return item;
    }
    array[index] = defaultValue;
    return array[index];
}
