'use strict';

const mysql = require('mysql');
const logger = require('./logger');
const log = new logger.log();

module.exports = class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connexion() {
    return new Promise((resolve, reject) => {
      this.connection.connect(function(e) {
        log.debug('Début de connexion à la base');
        if (e) {
          reject(e);
        }
        resolve(true);
      });
    });
  }

  close () {
    this.connection.end(function(e) {
      if (e) log.error('0x003 ' + e);
      log.debug('Fermeture de la connexion Bdd');
    });
  }

  query (sql, args) {
    return new Promise ((resolve, reject) => {
      this.connection.query(sql, (e, results, fields) => {
        // Handle error after the release.
        if (e) {
          log.error('0x002 ' + e);
          reject()
        } 
        resolve(results[0] ? results[0].id : null);
      });
    });
  }

  register (args) {
    for (element of args) {
      this.connection.query('INSERT INTO telephonie SET ?', element, (error, results, fields) => {
        // Handle error after the release.
        // if (error)
        if (error && error.code !== 'ER_DUP_ENTRY') {
          console.log(error);
        } else if (results) console.log(results.insertId);
      });
    }
  }
};
