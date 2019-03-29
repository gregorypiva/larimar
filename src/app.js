"use strict";

import {logger, config, bdd} from 'framework';
import {crawler} from './services/crawler';
import splitter from './services/splitter';

let params = config.params;

const crawl = async () => {
  logger.debug('Crawl de la page');
  try {
    let data = await crawler.leboncoin(params);
    data = await splitter.leboncoin(data);
    const number = await bdd.insert('telephonie', data);
    logger.debug(`Ajout de ${number} elements`, 'app.js');
  } catch (e) {
    logger.error(`app.js : ${e}`, 'app.js');
  }
}

const start = async () => {
  logger.debug('Démarrage de Larimar');
  while (params.page <= params.maxpage) {
    await crawl();
    params.page++;
  }
  logger.debug('Fin du service');
}

start();