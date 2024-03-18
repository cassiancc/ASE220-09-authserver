const http = require('http');
const fs = require('fs');


const port = 5050; // we can change this

const server = http.createServer((req, res)=> {
    const { method, url } = req;
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

        }).on("end", function() {
            body = JSON.parse(Buffer.concat(body).toString());
            let data = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
            const email= body["email"].toString();
            const password = body['password'].toString();
            const index = data.map(e => { return e.email }).indexOf(email);
            let unauthorized = false;
            res.on('error', error => {
                console.error(error);
            })
            if (url.includes('/api/signup')) {
                //signup stuff
                if(index === -1) {
                    data.push(body)
                    fs.writeFileSync('credentials.json', JSON.stringify(data, null, 2))
                    console.log("User created successfully.");
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify({status:1, message:"Signup Successful"}));
                    
                } else {
                    unauthorized = true;
                    console.error("That username already exists.");
                }
                
                
            } else if (url.includes('/api/signin')) {
                //signin stuff
                if(index !== -1) {
                    if(data[index].password === password) {
                        //do successful login things
                        console.log("Signin Successful.");
                        res.writeHead(200, {
                            "Content-Type": "application/json"
                        });
                        res.end(JSON.stringify({
                            status:1, message:"Signin Successful"
                        }));
                        
                    } else {
                        unauthorized = true;
                        console.log("The password was incorrect.");
                    }
                } else {
                    unauthorized = true;
                    console.log("Username not present.");
                }
            }
            if(unauthorized) {
                res.writeHead(400, {"Content-Type":"application/json"});
                res.end(JSON.stringify({status:-1, error:"Unauthorized Request"}));
            }
        })
        
    }
});

server.listen(port, () => console.log(`Server Listening on port ${port}`))

// use below curl command to test sign in functionality
//curl -i -X POST -d '{"email":"test@test.com", "password":"test123"}' localhost:5050/api/signin

// use below curl command to test sign up functionality
//curl -i -X POST -d '{"email":"new@email.com", "password":"password"}' localhost:5050/api/signup