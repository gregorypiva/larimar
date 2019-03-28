'use strict';

import mysql from 'mysql2/promise';
import {config, logger} from 'framework';

const query = async (sql, args) => {
  try {
    const {host, user, database} = config.mysql[process.env.NODE_ENV];
    const connection = await mysql.createConnection({host, user, database});
    logger.debug('Connexion à la base de donnée : ' + config.mysql[process.env.NODE_ENV].database, 'mysql.js');
    const results = await connection.execute(sql); 
    connection.end();
    logger.debug('Fermeture de la connexion bdd', 'mysql.js');
    return Promise.resolve(results[0]);
  } catch (e) {
    return Promise.reject('in mysqj.js : ' + e);
  }

}

export const bdd = {
  query
}