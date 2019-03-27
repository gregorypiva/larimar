const logger = require('./src/logger');
const log = new logger.log();

if (process.env.NODE_ENV === undefined) {
  log.error('process.env.NODE_ENV n\'est pas défini');
  throw new Error('process.env.NODE_ENV n\'est pas défini');
}

const crawler = require('./src/crawler');
const splitter = require('./src/services/splitter');
const database = require('./src/mysql');
const request = 'INSERT INTO telephonie SET ?';
const config = require('./config');

/* 
  Mise en forme de la data :
    {
      "url": []
      "model": []
      "price": []
      "status": []
      "color": []
      "memory": []
      "date": []
      "location": []
      "latitude": []
      "longitude": []
    }
*/

let params = config.params;
let error = null;

const crawl = async () => {
  try {
    const mysql = new database(config.mysql[process.env.NODE_ENV]);
    let data = await crawler.leboncoin(params);
    data = await splitter.leboncoin(data);
    await mysql.connexion();
    // await mysql.register(data);
    await mysql.close();
  } catch (e) {
    error = true;
    log.error(e);
  }
}

const start = async () => {
  log.debug('Démarrage de Larimar');
  while (params.page <= params.maxpage) {
    if (error) break;
    await crawl();
    params.page++;
  }
  log.debug('Fin du service');
}

start();
