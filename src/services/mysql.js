'use strict';

import mysql from 'mysql2/promise';
import {config, logger} from 'framework';

const query = async (sql, args = []) => {
  let connection = null;
  try {
    const {host, user, database, socketPath} = config.mysql[process.env.NODE_ENV];
    connection = await mysql.createConnection({host, user, database, socketPath});
    logger.debug('Connexion à la base de donnée : ' + config.mysql[process.env.NODE_ENV].database, 'mysql.js');
    const results = await connection.execute(sql, args); 
    connection.end();
    logger.debug(`Execution de la requete : ${sql} \n Fermeture de la connexion bdd`, 'mysql.js');
    return Promise.resolve(results[0]);
  } catch (e) {
    if (connection) connection.end();
    if (e && e.code !== 'ER_DUP_ENTRY') {
      return Promise.reject(`in mysqj.js : \n requete [${sql}] \n arguments ${args} \n ${e}`);
    } else return Promise.reject(false);
  }
}

const insert = async (table, args) => {
  if (typeof args !== 'object') return Promise.reject('args doit être un object');
  //const request = `INSERT INTO ${table} (${Object.keys(element)}) VALUES ( ? )`;
  let number = 0;
  for (let element of args) {
    try {
      await query(`INSERT INTO ${table} (${Object.keys(element)}) VALUES ( ${Object.values(element).toString()} )`);
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