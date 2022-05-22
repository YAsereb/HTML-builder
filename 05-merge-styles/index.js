const path = require('path');
const fs = require('fs');

const stylesFolder = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
  fs.writeFile(bundlePath, '', (err) => {
    if (err) return console.error(err);
  });
  if (err) console.error(err);
  files.forEach((file) => {

    if (file.isFile() && path.extname(file.name) === '.css') {
      fs.readFile(path.join(stylesFolder, `${file.name}`), (err, data) => {
        if (err) console.error(err);
        fs.appendFile(bundlePath, data.toString(), (err) => {
          if (err) return console.error(err);
        });
      });
    }
  });
});