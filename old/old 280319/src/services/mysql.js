'use strict';

import mysql from 'mysql';
import {config, logger} from 'framework';

const pool = mysql.createPool({
  host       : 'localhost',
  user       : 'root',
  password   : '',
  database   : 'larimar'
});

const database = mysql.createConnection({
  host       : 'localhost',
  user       : 'root',
  password   : '',
  database   : 'larimar'
});

const connexion = () => {
  return new Promise((resolve, reject) => {
    database.connect(function(err) {
      if (err) reject(err);
      else {
        logger.debug('Connexion à la base de donnée : ' + config.mysql[process.env.NODE_ENV].database, 'mysql.js');
        resolve(true);
      }
    });
  });
}

const close = () => {
  database.end(function(e) {
    if (e) {
      logger.error(e, 'mysql.js');
      return;
    } 
    // The connection is terminated now
    logger.debug('Fermeture de la connexion bdd', 'mysql.js');
    return;
  });
}

const query = async (sql, args) => {
  return new Promise ((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
          connection.release();
          reject(err);
          return;
      }

      connection.query(sql, args, function (err, results) {
          connection.release();
          if (err) {
              reject(err);
              return;
          }
          else {
            resolve(results[0] ? results[0] : null);
          }
      });

      connection.on('error', function (err) {
          connection.release();
          reject(err);
          return;
      });
    });
  });

  // return new Promise( async (resolve, reject) => {
  //   try {
  //     database.query(sql, (e, results, fields) => {
  //       // Handle error after the release.
  //       if (e) {
  //         close();
  //         reject(e);
  //       } 
  //       else {
  //         close();
  //         resolve(results[0] ? results[0] : null);
  //       }
  //     });
  //   } catch (e) {
  //     logger.error(e, 'mysql.js');
  //   }
  // })
}

export const bdd = {
  query
}