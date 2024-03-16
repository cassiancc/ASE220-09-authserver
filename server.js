const http = require('http');
const fs = require('fs');

const port = 5050; // we can change this

const server = http.createServer((req, res)=> {
    if (req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type':'text/html'
        });
        res.write(fs.readFileSync('html/index.html'));
        
    } else if (req.method === 'POST') {
        if (req.url.includes('/api/signup')) {
            //signup stuff
        } else if (req.url.includes('/api/signin')) {
            //signin stuff
        }
    }
    res.end();
});

server.listen(port, () => console.log(`Server Listening on port ${port}`))