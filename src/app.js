"use strict";

import {logger, config, bdd} from 'framework';
import {crawler} from './services/crawler';
import splitter from './services/splitter';
import { exists } from 'fs';

let params = config.params;

const crawl = async () => {
  logger.debug('Crawl de la page');
  try {
    let data = await crawler.leboncoin(params);
    data = await splitter.leboncoin(data);
    await bdd.insert('telephonie', data);
  } catch (e) {
    logger.error(e);
  }

}

const start = async () => {
  logger.debug('Démarrage de Larimar');
  await crawl();
}

start();