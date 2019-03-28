"use strict";

import {config} from 'framework';
const fs = require('fs');
const fsPromises = require('fs').promises;
const { Console } = require('console');

const getDirectory = async () => {
  try {
    await fsPromises.readdir(config.log.dir);
    return true;
  } catch(e) {
    if(e.code === 'ENOENT') createDirectory();
  }
}

const createDirectory = async () => {
  try {
    await fsPromises.mkdir(config.log.dir, { recursive: true });
  } catch(e) {
    throw `Error type=function name=createDirectory : ${e}`;
  }
}

const sendFile = async (mode, args) => {
  const checkDir = await getDirectory();
  const stdout = fs.createWriteStream(`${config.log.dir}${config.log.name}.log`, {flags: 'a'});
  const logger = new Console({ stdout });
  const date = new Date();
  logger.log(`${date.toLocaleDateString('fr-FR')} - ${mode} (-) ${args.filename} (-) ${args.code} : ${args.message} \r\n`);
}

const send = (mode, args) => {
  if (config.log.type === 'console') console.log(`${mode} (-) ${args.filename} (-) ${args.code} : ${args.message}`);
  if (config.log.type === 'file') sendFile(mode, args);
}

const error = (message, filename = 'file?', code = '0x0') => {
  const args = {message, filename, code};
  send('ERROR', args);
}

const warn = (message, filename = 'file?', code = '0x0') => {
  if (config.log.level < 1) return;
  const args = {message, filename, code};
  send('WARN', args);
}

const debug = (message, filename = 'file?', code = '0x0') => {
  if (config.log.level < 2) return;
  const args = {message, filename, code};
  send('DEBUG', args);
}

const info = (message, filename = 'file?', code = '0x0') => {
  if (config.log.level < 3) return;
  const args = {message, filename, code};
  send('INFO', args);
}

export const logger = {
  error,
  warn,
  debug,
  info
}
