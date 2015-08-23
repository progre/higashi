export default class FPSCounter {
    count = 0;

    constructor() {
        setInterval(
            () => {
                console.log(this.count);
                this.count = 0;
            },
            1000);
     }

    tick() {
        this.count++;
    }
}
