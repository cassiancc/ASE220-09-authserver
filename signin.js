const readline = require('readline');
const validator = require('validator');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your email address: ', (email) => {

  rl.question('Enter your password: ', (password) => {

    const user = {
      email,
      password 
    };

    fs.readFile("credentials.json", "utf8", (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        data = JSON.parse(data);
        if ((user.email == data.email) && (user.password == data.password)) {
            console.log("Welcome!")
        }
        else {
            console.log("Your email or password is incorrect. Please try again.")
        }
        rl.close();
      });
  });
});
