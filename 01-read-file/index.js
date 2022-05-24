const fs = require('fs');
const path = require('path');

const txtPath = path.join(__dirname, 'text.txt');

let data = '';
const readsStream = fs.createReadStream(txtPath, 'utf-8');
readsStream.on('data', chunk => data += chunk);
readsStream.on('end', () => console.log(data));


