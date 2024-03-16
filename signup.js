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

    //Read existing data
    data = fs.readFileSync("credentials.json", "utf8")

    //Validate JSON array. If not formatted correctly, reset the file.
    if (data[0] == "[") {
      data = JSON.parse(data)
    }
    else {
      data = []
    }
    //Push new user to array.
    data.push(user)

    //Write stringified data to file.
    data = JSON.stringify(data, null, 2)
    fs.writeFile('credentials.json', data, (err) => {
      if (err) throw err;
      console.log('User credentials saved to credentials.json');
      rl.close();
    });
  });
});
