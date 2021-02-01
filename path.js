const path = require('path');
const fs = require('fs');

const user = {
  name: 'Artem',
  age: 24,
  country: 'Czech'
}

fs.readFile('message.json', function(err, data) {
  if(err) throw err;
  let info = JSON.parse(data);
  console.log(info.age - 20);
});
