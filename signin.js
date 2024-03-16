const readline = require('readline');
const validator = require('validator');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function signIn() {
    //Check email
    rl.question('Enter your email address: ', function (email) {
        //Check password
        rl.question('Enter your password: ', async function (password) {

            const user = {
                email,
                password
            };

            checkLogin(user)
        });
    });
}

async function checkLogin(user) {
    data = fs.readFileSync("credentials.json", "utf8")
    data = JSON.parse(data);
    //If provided email matches, close "loop".
    let valid = false
    data.forEach(function(dataPoint) {
        if ((user.email == dataPoint.email) && (user.password == dataPoint.password)) {
            console.log("Welcome!")
            valid = true
        }
    })
    if (valid) {
        rl.close();

    }
    else {
        console.log("Your email or password is incorrect. Please try again.")
        signIn()

    }

    
}

signIn()
