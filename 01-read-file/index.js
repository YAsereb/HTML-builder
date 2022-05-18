const fs = require('fs');
const path = require('path');

const txtPath = path.join(__dirname, 'text.txt');

fs.readFile(txtPath, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});



