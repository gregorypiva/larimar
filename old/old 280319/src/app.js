"use strict";

import {logger, config, bdd} from 'framework';
import {crawler} from './services/crawler';
import splitter from './services/splitter';

let params = config.params;

const crawl = async () => {
  logger.debug('Crawl de la page');
  let data = await crawler.leboncoin(params);
  data = await splitter.leboncoin(data);
  //const data = await bdd.query('select * from telephonie');
}

const start = async () => {
  logger.debug('Démarrage de Larimar');
  await crawl();
}

start();