## fifo-callback

[![Build Status](https://semaphoreci.com/api/v1/gorangajic/fifo-callback/branches/master/badge.svg)](https://semaphoreci.com/gorangajic/fifo-callback)

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
