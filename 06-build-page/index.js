const path = require('path');
const fs = require('fs');
const { dirname } = require('path');

const projectFolderPath = path.join(__dirname, 'project-dist');
const templateFilePAth = path.join(__dirname, 'template.html');
const indexHTMLPath = path.join(projectFolderPath, 'index.html');
const componentsFolderPath = path.join(__dirname, 'components');

const stylesFolder = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'style.css');

const assetsPath = path.join(__dirname, 'assets');
const assetsCopyPath = path.join(projectFolderPath, 'assets');


//create project-dist folder

fs.mkdir(path.join(projectFolderPath), { recursive: true }, (error) => {
  if (error) return console.error(error);
});

// copy template.html to index.html in project-dist folder

const getComponent = async (src) => {
  let component = await fs.promises.readFile(src, 'utf-8');
  return component;
};

const getIndexData = async (arr, str, src) => {
  for (let file of arr) {
    if (file.isFile()) {
      let component = await getComponent(path.join(src, file.name));
      let change = `{{${path.parse(file.name).name}}}`;
      str = str.replace(change, component);
    }
  } return str;

};

const createIndexHTML = async () => {

  let templateData = await getComponent(templateFilePAth);

  let files = await fs.promises.readdir(componentsFolderPath, { encoding: 'utf-8', withFileTypes: true });

  let indexData = await getIndexData(files, templateData, componentsFolderPath);

  await fs.promises.writeFile(indexHTMLPath, indexData, 'utf-8');

};

createIndexHTML();

// create styles.css in project-dist folder

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

// copy assets to project-dist folder

const copyDir = (src, dest) => {

  fs.readdir(src, { withFileTypes: true, encoding: 'utf-8' }, (err, files) => {
    if (err) console.error(err);

    files.forEach((file) => {

      let filePath = path.join(src, file.name);
      let fileCopyPath = path.join(dest, file.name);

      if (file.isDirectory()) {

        fs.mkdir(fileCopyPath, { recursive: true }, (err) => {
          if (err) return console.error(err);
          copyDir(filePath, fileCopyPath);
        });

      }
      if (file.isFile()) {

        fs.copyFile(filePath, fileCopyPath, (err) => {
          if (err) return console.error(err);
        });
      }
    });
  });
};

copyDir(assetsPath, assetsCopyPath);




