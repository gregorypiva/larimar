'use strict';

import mysql from 'mysql2/promise';
import {config, logger} from 'framework';

const query = async (sql, args = '') => {
  try {
    const {host, user, database} = config.mysql[process.env.NODE_ENV];
    const connection = await mysql.createConnection({host, user, database});
    logger.debug('Connexion à la base de donnée : ' + config.mysql[process.env.NODE_ENV].database, 'mysql.js');
    const results = await connection.execute(sql, args); 
    connection.end();
    logger.debug('Fermeture de la connexion bdd', 'mysql.js');
    return Promise.resolve(results[0]);
  } catch (e) {
    return Promise.reject(`in mysqj.js : \n requete [${sql}] \n arguments [${args}] \n ${e}`);
  }
}

const insert = async (table, args) => {
  if (typeof args !== 'object') return Promise.reject('args doit être un object');
  const request = `INSERT INTO ${table} SET ?`;
  const number = 0;
  for (let element of args) {
    try {
      element = Object.values(element); // mysql.escape(
      await query(request, element);
      //await query(request, element);
      number++;
    } catch (e) {
      if (e && e.code !== 'ER_DUP_ENTRY') {
        logger.error(e);
      }
    }
  }
  return Promise.resolve(number);
}

export const bdd = {
  query,
  insert
}