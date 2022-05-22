const path = require('path');
const fs = require('fs');

const filesPath = path.join(__dirname, 'files');
const filesCopyPath = path.join(__dirname, 'files-copy');


fs.mkdir(filesCopyPath, { recursive: true }, (err) => {
  if (err) return console.error(err);
});

(function copyDir() {
  clearDirectory(filesCopyPath);
  fs.readdir(filesPath, { withFileTypes: true }, (err, files) => {
    if (err) return console.error(err);

    files.forEach((file) => {
      let filePath = path.join(filesPath, `${file.name}`);
      let copyFilePath = path.join(filesCopyPath, `${file.name}`);

      fs.copyFile(filePath, copyFilePath, (err) => {
        if (err) return console.error(err);
      });
    });
  });
})();


function clearDirectory(src) {
  fs.readdir(src, { encoding: 'utf-8', withFileTypes: true }, (err, files) => {
    if (err) console.error(err);
    files.forEach((file) => {
      fs.unlink(path.join(src, file.name), (err) => {
        if (err) console.error(err);
      });
    });
  });
}


