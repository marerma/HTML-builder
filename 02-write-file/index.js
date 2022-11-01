const fs = require('fs');
const path = require('path');
const { stdout, stdin } = require('process');


stdout.write('Hello! You can write you text here and I will save it in a separate file\n');
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'saved-input.txt'));
 
stdin.on('data', data => {
  let dataStringified = data.toString().trim();
  if (dataStringified === 'exit') {
   process.exit();
  } else {
    writeStream.write(`${dataStringified}\n`);
  }
});
process.on('exit', () => stdout.write('Have a nice day!'));
process.on('SIGINT', () => {
  stdout.write('Have a nice day!');
  process.exit();
})