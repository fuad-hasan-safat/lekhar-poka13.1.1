const express = require('express');
const next = require('next');
const port = 3007;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(port, err => {
        if (err) throw err;
        console.log(`ready on http://localhost:${port}`)
    })
}).catch(ex => {
    console.error(ex.stack);
    process.exit(1);

})