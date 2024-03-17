const http = require('http');
const fs = require('fs');


const port = 5050; // we can change this

const server = http.createServer((req, res)=> {
    const { headers, method, url } = req;
    if (method === 'GET') {
        res.writeHead(200, {
            'Content-Type':'text/html'
        });
        res.write(fs.readFileSync('html/index.html'));
        console.log("You sent a GET request");

    } else if (method === 'POST') {
        console.log("you sent a POST request");
        let body = [];
        req.on('data', function(data) {
            body.push(data);
        })
        .on("end", function() {
            body = JSON.parse(Buffer.concat(body).toString());

            res.on('error', error => {
                console.error(error);
            })
            if (url.includes('/api/signup')) {
                //signup stuff
                
                
            } else if (url.includes('/api/signin')) {
                //signin stuff
                let data = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
                
                const email= body["email"].toString();
                const password = body['password'].toString();
                
                index = data.map(function(e) { return e.email }).indexOf(email)
                console.log(index);
                if(index !== null) {
                    
                    if(data[index].password === password) {
                        console.log("Login Successful.");
                    }
                } else {
                    console.log("Username not present.");
                }
    
            }
        })
        
    }
    res.end();
});

server.listen(port, () => console.log(`Server Listening on port ${port}`))

// use below curl command to test login functionality
//curl -i -X POST -d '"{email":"test@test.com", "password":"test123"}' localhost:5050/api/signin