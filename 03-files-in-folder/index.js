const fs = require('fs');
const path = require('path');
const targetDir = path.join(__dirname, 'secret-folder');


fs.promises.readdir(targetDir, {withFileTypes: true})
    .then(filenames => {
        for (let filename of filenames) {
          if(filename.isFile()) {
            const filePath = path.join(targetDir, filename.name);
            const ext = (path.parse(filePath).ext).replace('.', '');
            const name = path.parse(filePath).name;
            fs.promises.stat(filePath)
              .then(finalList => {
                const size = finalList.size;
                console.log(name, '-', ext, '-', size,'bytes');
              })
          }
        }
    })
     .catch(err => {
        console.log(err);
    })