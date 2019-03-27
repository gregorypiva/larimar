'use strict';

const mysql = require('mysql');

module.exports = class Database {
  constructor(config) {
    this.connection = mysql.createConnection({
      host            : 'localhost',
      user            : 'tityus',
      password        : 'qscpzllmO1@',
      database        : 'larimar'
    });

    this.connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
    });
  }

  query (sql, args) {
    return new Promise ((resolve, reject) => {
      this.connection.query(sql, (error, results, fields) => {
        // Handle error after the release.
        if (error) throw error;
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

  close () {
    this.connection.end(function(error) {
      if (error) throw error;
      // The connection is terminated now
    });
  }
};
