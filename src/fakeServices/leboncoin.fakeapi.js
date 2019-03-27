const fs = require('fs');

module.exports = (params) => {
  return new Promise((resolve, reject) => {
    fs.readFile('./src/fakeServices/leboncoin.data.txt', 'utf8', function (err,data) {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data).results);
    });
  });
};