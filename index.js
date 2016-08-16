

class Fifo {
    constructor() {
        this.queue = [];
        this.inProgress = false;
    }
    get length() {
        return this.queue.length;
    }
    push(callback) {
        this.queue.push(callback);
        this.check('push');
    }
    check(calledBy) {
        if (this.inProgress || this.queue.length === 0) {
            return;
        }
        this.run();
    }
    run() {
        this.inProgress = true;
        setTimeout(() => {
            const callback = this.queue[0];
            callback(() => this.done());
        }, 0);
    }
    done() {
        this.queue.shift();
        this.inProgress = false;
        this.check('done');
    }
}

module.exports = Fifo;


