const path = require('path');
const fs = require('fs');

const secretFolderPath = path.join(__dirname, './secret-folder');

fs.readdir(secretFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (file.isFile()) {
      let filePath = path.join(secretFolderPath, `/${file.name}`);
      let fileName = path.basename(filePath, path.extname(file.name));
      let fileExtension = path.extname(file.name).slice(1, path.extname(file.name).length);

      fs.stat(filePath, (err, stats) => {
        if (err) console.error(err);
        console.log(`${fileName} - ${fileExtension} - ${stats.size}b`);
      });
    }
  });
});

