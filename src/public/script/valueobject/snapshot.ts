import Input from '../input/input';
import Player from './player';

export default class Snapshot {
    constructor(
        public previous: Snapshot,
        public input: Input,
        public players: Player[]) {
    }
}
