const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const readStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8');
readStream.on('data', data => {stdout.write(data)});