const path = require('path');
const fs = require('fs');

const filesPath = path.join(__dirname, './files');
const filesCopyPath = path.join(__dirname, './files-copy');


fs.readdir(filesPath, { withFileTypes: true }, (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    let filePath = path.join(filesPath, `${file.name}`);
    let copyFilePath = path.join(filesCopyPath, `${file.name}`);
    fs.mkdir(filesCopyPath, { recursive: true }, (err) => {
      if (err) return console.error(err);
    });
    fs.copyFile(filePath, copyFilePath, (err) => {
      if (err) return console.error(err);
    });
  });
});


