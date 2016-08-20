import Fifo from './';
import should from 'should';


describe('fifo-callback', function() {

    it('initial queue should be empty', () => {
        const queue = new Fifo();
        queue.should.have.length(0);
    });

    it('it should add callback to queue', () => {
        const queue = new Fifo();
        queue.push(() => {});

        queue.should.have.length(1);
    });

    it('it should call callback immediately if queue empty', end => {
        const queue = new Fifo();
        queue.push(() => end());

        queue.should.have.length(1);
    });

    it('it should remove from queue when done', end => {
        const queue = new Fifo();
        queue.push((done) => {
            done();
            queue.should.have.length(0);
            end();
        });

        queue.should.have.length(1);
    });

    it('it should call one after another', end => {
        const queue = new Fifo();
        let i = 0;
        queue.push((done) => {
            i.should.be.equal(0);
            i++;
            setTimeout(done, 20);
        });

        queue.push((done) => {
            i.should.be.equal(1);
            done();
            queue.should.have.length(0);
            end();
        });

        queue.should.have.length(2);
    });

    it('it should call immediately after delay', end => {
        const queue = new Fifo();
        let i = 0;
        queue.push(done => {
            i.should.be.equal(0);
            i++;
            setTimeout(done, 20);
        });

        queue.push((done) => {
            i.should.be.equal(1);
            done();
            queue.should.have.length(0);
            setTimeout(() => {
                queue.push(done => {
                    done();
                    end();
                });
            }, 20);
        });

        queue.should.have.length(2);
    });


    it('it should kill queue so next task is not run', end => {
        const queue = new Fifo();
        let i = 0;
        queue.push(done => {
            setTimeout(done, 30);
            queue.kill();
        });
        queue.push(done => {
            throw new Error('it should not be reached');
        });
        setTimeout(() => end(), 50);
    });

});