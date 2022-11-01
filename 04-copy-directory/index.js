const fs = require('fs');
const path = require('path');
const sourceDir = path.join(__dirname, 'files');
const endDir = path.join(__dirname, 'files-copy');

fs.access(path.join(__dirname, 'files-copy'), function(error) {
  if (!error) {
    fs.rm(endDir,  { recursive: true }, () => {
      readFiles(sourceDir, endDir)}
      );
  } else {
      readFiles(sourceDir, endDir);
  }
  })

function readFiles(dir, targetDir) {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, callback);
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
              readFiles(filePath, newTarget)
          }
        }
    })
     .catch(err => {
        console.log(err);
    })
}


function callback(err) {
  if (err) throw err;
}