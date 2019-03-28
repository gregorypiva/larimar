'use strict';

const mysql = require('mysql');
import {config, logger} from 'framework';

const database = {
  connection: mysql.createConnection({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'larimar'
  }),
  connexion: (e) => {
    return new Promise((resolve, reject) => {
      database.connection.connect(function(e) {
        if (e) reject(e);
        logger.debug('Connexion à la base de donnée : ' + config.mysql[process.env.NODE_ENV].database);
        resolve(true);
      });
    });
  },
  close: async () => {
    return new Promise((resolve, reject) => {
      database.connection.end(function(e) {
        if (e) return reject(e);
        // The connection is terminated now
        logger.debug('Fermeture de la connexion bdd');
        resolve(true);
      });
    });
  }
}

const query = async (sql, args) => {
  return new Promise( async (resolve, reject) => {
    try {
      await database.connexion();
      database.connection.query(sql, (e, results, fields) => {
        // Handle error after the release.
        if (e) throw error;
        resolve(results[0] ? results[0] : null);
      });
      await database.close();
    } catch (e) {
      logger.error(e);
    }
  })
}

export const bdd = {
  query
}