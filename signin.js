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
    if ((user.email == data.email) && (user.password == data.password)) {
        console.log("Welcome!")
        rl.close();
    }
    //If provide email does not match, check again.
    else {
        console.log("Your email or password is incorrect. Please try again.")
        signIn()
    }
}

signIn()
