import {config, logger} from 'framework';
const fs = require('fs');

const leboncoinApi = (params) => {
  return new Promise((resolve, reject) => {
    fs.readFile('./src/fakeServices/leboncoin.data.txt', 'utf8', (e, data) => {
      logger.debug(`Mode : DEV - Lecture du fichier leboncoin.data.txt`);
      if (e) {
        return reject(e);
      }
      logger.debug('Récupération des données effectuée');
      logger.info(data);
      return resolve(JSON.parse(data).results);
    });
  });
};

export default leboncoinApi;