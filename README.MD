## fifo-callback

> simple fifo callback queue

```
npm install fifo-callback
```

```javascript
import Fifo from 'fifo-callback';
const queue = new Fifo();
queue.push(done => {
    setTimeout(done, 100);
});

queue.push((done) => {
    done();
});

setTimeout(() => {
    queue.push(done => {
        done();
        t.end();
    });
}, 200);
```
