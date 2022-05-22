const path = require('path');
const fs = require('fs');

const { stdin, stdout } = process;

const txtPath = path.join(__dirname, 'text.txt');

function createTxtFile() {
  fs.writeFile(txtPath, '', (err) => {
    if (err) return console.error(err.message);
  });
}

process.on('beforeExit', () => {
  fs.access(txtPath, (error) => {
    if (error) createTxtFile();
    stdout.write('Здравствуйте, введите текст\n');
    stdin.on('data', (data) => {
      let string = data.toString();
      string = string.slice(0, string.length - 2);
      if (string === 'exit') {
        console.log('Goodbye');
        process.exit(1);
      }
      fs.appendFile(txtPath, data, (err) => {
        if (err) return console.log(err);
      });
    });
  });
});

process.on('SIGINT', () => {
  console.log('Goodbye');
  process.exit(1);
});


