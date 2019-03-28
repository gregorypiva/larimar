import {config, logger} from 'framework';
const fs = require('fs');

const leboncoinApi = (params) => {
  return 'ok';
  // return new Promise((resolve, reject) => {
  //   fs.readFile('./src/fakeServices/leboncoin.data.txt', 'utf8', function (err,data) {
  //     log.debug(`Mode : DEV - Lecture du fichier leboncoin.data.txt`);
  //     if (err) {
  //       reject(err);
  //       return;
  //     }
  //     log.debug('Récupération des données effectuée');
  //     log.info(data);
  //     resolve(JSON.parse(data).results);
  //   });
  // });
};

export {leboncoinApi};