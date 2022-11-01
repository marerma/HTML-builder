const fs = require('fs');
const path = require('path');
const componentPath = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const endDir = path.join(__dirname, 'project-dist');
const indexPath = path.join(endDir, 'index.html');
const assetsDir = path.join(__dirname, 'assets');
const content = {};
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, callback);

copyAssets();
bundleStyle ();

const readTemplate = fs.createReadStream(templatePath, 'utf-8');
readTemplate.on('data', (template) => {
  let text = template;
  

  fs.promises.readdir(componentPath, {withFileTypes: true})
    .then(filenames => {
      for (let filename of filenames) {
        const filePath = path.resolve(componentPath, filename.name);
        if(path.extname(filePath) === '.html') {
          let readableStream = fs.createReadStream(filePath, "utf8");
        let key = (filename.name).replace(path.extname(filePath), '');
       
        readableStream.on('data', function(data) {
          content[key] = data;
          text = text.replace(`{{${key}}}`, content[key]);
          fs.writeFile(indexPath, text, callback);
        }); 
        }
      } 
    })
    .catch(err => {
      console.log(err)}); 
  });






function copyAssets() {
  fs.mkdir(path.join(endDir, 'assets'), { recursive: true }, callback);
  const targetAssetsPath = path.join(endDir, 'assets');
  copyFiles(assetsDir, targetAssetsPath);
}

function bundleStyle () {
  const sourceStyleDir = path.join(__dirname, 'styles');
  const bundlePath = path.join(endDir, 'style.css');
  fs.writeFile(bundlePath, '', callback)
  
  fs.promises.readdir(sourceStyleDir, {withFileTypes: true})
  .then(filenames => {
    for (let filename of filenames) {
      const filePath = path.resolve(sourceStyleDir, filename.name);
          if(filename.isFile() && path.extname(filePath) === '.css') {
            fs.readFile(filePath, 'utf-8', readingFile);
          }            
          } 
        })
      .catch(err => {
        console.log(err);
    })

    function readingFile(error, data) {
      if (error) throw error; 
      else { 
        fs.appendFile(bundlePath, data, callback);
      }}
    }
  

function callback(err) {
  if (err) throw err;
}

function copyFiles(dir, targetDir) {
  fs.promises.readdir(dir, {withFileTypes: true})
  .then(filenames => {
    for (let filename of filenames) {
      const filePath = path.join(dir, filename.name);
      const targetFile = path.join(targetDir, filename.name);
      if(filename.isFile()) {
        fs.copyFile(filePath, targetFile, callback);
      } else if(filename.isDirectory()) {
        fs.mkdir(path.join(targetDir, filename.name), { recursive: true }, callback);
        const newTarget = path.join(targetDir, filename.name);
              copyFiles(filePath, newTarget)
            }
        }
    })
      .catch(err => {
        console.log(err);
    })
}