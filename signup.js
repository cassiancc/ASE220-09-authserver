const readline = require('readline');
const validator = require('validator');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your email address: ', (email) => {
  if (!validator.isEmail(email)) {
    console.log('Invalid email format.');
    rl.close();
    return;
  }

  rl.question('Enter your password (min 6 characters): ', (password) => {
    if (password.length < 6) {
      console.log('Password is too weak.');
      rl.close();
      return;
    }

    const user = {
      email,
      password 
    };

    fs.writeFile('credentials.json', JSON.stringify(user, null, 2), (err) => {
      if (err) throw err;
      console.log('User credentials saved to credentials.json');
      rl.close();
    });
  });
});
