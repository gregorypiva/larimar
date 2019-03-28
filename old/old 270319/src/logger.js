"use strict";

/* UTILISATION

const logger = require('./logger');
const log = new logger.log();

log.info('phrase d'info');
log.debug('phrase de debug');
log.warn('phrase de warning');
log.error('phrase d'error'');

*/

const fs = require('fs');
const fsPromises = fs.promises;
const config = require('../config');
const { Console } = require('console');

const log = class {
  constructor(name, level, type, dir) {
    this.name = name || config.log.name || 'log-server';
    this.level = level || config.log.level || 0;
    this.type = type || config.log.type || 'console';
    this.dir = dir || config.log.dir || './logs/';
  }

  error(message) {
    this.send('ERROR', message);
  }

  warn(message) {
    if (this.level < 1) return;
    this.send('WARN', message);
  }

  debug(message) {
    if (this.level < 2) return;
    this.send('DEBUG', message);
  }

  info(message) {
    if (this.level < 3) return;
    this.send('INFO', message);
  }

  async getDirectory() {
    try {
      await fsPromises.readdir(this.dir);
      return true;
    } catch(e) {
      if(e.code === 'ENOENT') this.createDirectory();
    }
  }

  async createDirectory() {
    try {
      await fsPromises.mkdir(this.dir, { recursive: true });
    } catch(e) {
      throw `Error type=function name=createDirectory : ${e}`;
    }
  }

  send(mode, message) {
    if (this.type === 'console') this.sendConsole(mode, message);
    if (this.type === 'file') this.sendFile(mode, message);
  }

  sendConsole(mode, message) {
    switch (mode) {
      case 'ERROR':
        console.error(message);
        break;
        case 'WARN':
        console.warn(message);
        break;
        case 'DEBUG':
        console.debug(message);
        break;
        case 'INFO':
        console.info(message);
        break;
    }
  }

  async sendFile(mode, message) {
    await this.getDirectory();
    const stdout = fs.createWriteStream(`${this.dir}${this.name}.log`, {flags: 'a'});
    const logger = new Console({ stdout });
    const date = new Date();
    logger.log(`${date.toLocaleDateString('fr-FR')} - ${mode} : ${message} \r\n`);
  }
}

module.exports = {
  log,
}