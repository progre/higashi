export default class Controller {
    static wrap(a: Controller) {
        return new this(a.up, a.down, a.left, a.right);
    }

    static empty() {
        return new this(false, false, false, false);
    }

    constructor(
        public up: boolean,
        public down: boolean,
        public left: boolean,
        public right: boolean
        ) {
    }

    equals(obj: Controller) {
        return this.up === obj.up
            && this.down === obj.down
            && this.left === obj.left
            && this.right === obj.right;
    }
}
