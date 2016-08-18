import test from 'ava';
import Fifo from './';

test('initial queue should be empty', t => {
    const queue = new Fifo();
    t.is(queue.length, 0);
});

test('it should add callback to queue', t=> {
    const queue = new Fifo();
    queue.push(() => {});

    t.is(queue.length, 1);
});

test.cb('it should call callback immediately if queue empty', t=> {
    const queue = new Fifo();
    queue.push(() => t.end());

    t.is(queue.length, 1);
});

test.cb('it should remove from queue when done', t => {
    const queue = new Fifo();
    queue.push((done) => {
        done();
        t.is(queue.length, 0);
        t.end();
    });

    t.is(queue.length, 1);
});

test.cb('it should call one after another', t => {
    const queue = new Fifo();
    let i = 0;
    queue.push((done) => {
        t.is(i, 0);
        i++;
        setTimeout(done, 50);
    });

    queue.push((done) => {
        t.is(i, 1);
        done();
        t.is(queue.length, 0);
        t.end();
    });

    t.is(queue.length, 2);
});

test.cb('it should call immediately after delay', t => {
    const queue = new Fifo();
    let i = 0;
    queue.push(done => {
        t.is(i, 0);
        i++;
        setTimeout(done, 100);
    });

    queue.push((done) => {
        t.is(i, 1);
        done();
        t.is(queue.length, 0);
        setTimeout(() => {
            queue.push(done => {
                done();
                t.end();
            });
        }, 100);
    });

    t.is(queue.length, 2);
});


test.cb('it should kill queue so next task is not run', t => {
    const queue = new Fifo();
    let i = 0;
    queue.push(done => {
        setTimeout(done, 30);
        queue.kill();
    });
    queue.push(done => {
        t.fail();
    });
    setTimeout(() => t.end(), 50);
})