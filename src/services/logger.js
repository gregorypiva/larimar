"use strict";

import {config} from 'framework';
import fs from 'fs';
const { Console } = require('console');

const getDirectory = async () => {
  try {
    await fs.fsPromises.readdir(config.log.dir);
    return true;
  } catch(e) {
    if(e.code === 'ENOENT') return 'ENOENT';
  }
}

const createDirectory = async () => {
  try {
    console.log(config.log.dir);
    await fs.fsPromises.mkdir(config.log.dir, { recursive: true });
  } catch(e) {
    throw `Error type=function name=createDirectory : ${e}`;
  }
}

const sendFile = async (mode, message) => {
  const checkDir = await getDirectory();
  if(checkDir === 'ENOENT') await createDirectory();
  const stdout = fs.createWriteStream(`${config.log.dir}${config.log.name}.log`, {flags: 'a'});
  const logger = new Console({ stdout });
  const date = new Date();
  logger.log(`${date.toLocaleDateString('fr-FR')} - ${mode} : ${message} \r\n`);
}

const send = (mode, message) => {
  if (config.log.type === 'console') console.log(mode, message);
  if (config.log.type === 'file') sendFile(mode, message);
}

const error = (message) => {
  send('ERROR', message);
}

const warn = (message) => {
  if (config.log.level < 1) return;
  send('WARN', message);
}

const debug = (message) => {
  if (config.log.level < 2) return;
  send('DEBUG', message);
}

const info = (message) => {
  if (config.log.level < 3) return;
  send('INFO', message);
}

export const logger = {
  error,
  warn,
  debug,
  info
}
