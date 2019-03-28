import {config, logger} from 'framework';
const fs = require('fs');

const leboncoinApi = (params) => {
  return new Promise((resolve, reject) => {
    fs.readFile('./src/fakeServices/leboncoin.data.txt', 'utf8', function (err,data) {
      logger.debug(`Mode : DEV - Lecture du fichier leboncoin.data.txt`);
      if (err) {
        reject(err);
        return;
      }
      logger.debug('Récupération des données effectuée');
      logger.info(data);
      resolve(JSON.parse(data).results);
    });
  });
};

export default leboncoinApi;