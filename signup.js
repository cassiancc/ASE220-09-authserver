const prompt = require('prompt-sync')({
    history: require('prompt-sync-history')() //open history file
  });
//get some user input
var input = prompt("Please provide your email address")
prompt.history.save() //save history back to file

console.log(`You wrote ${input}`)