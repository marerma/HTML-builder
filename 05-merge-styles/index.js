const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'project-dist');
const initialDir = path.join(__dirname, 'styles');
const targetFilePath = path.join(targetDir, 'bundle.css')
fs.writeFile(targetFilePath, '', callback)



fs.promises.readdir(initialDir, {withFileTypes: true})
  .then(filenames => {
      for (let filename of filenames) {
        const filePath = path.resolve(initialDir, filename.name);
        if(filename.isFile() && path.extname(filePath) === '.css') {
          fs.readFile(filePath, 'utf-8', readingFile)
          }            
        } 
      })
    .catch(err => {
      console.log(err);
  })

function callback(err) {
  if (err) throw err;
}

function readingFile(error,data) {
  if (error) throw error; 
  else { 
    fs.appendFile(targetFilePath, data, callback);
}}