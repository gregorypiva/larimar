const config = require('../config');


const leboncoinApi = (config.mode === 'DEV') ?
  require('./fakeServices/leboncoin.fakeapi')
    : require('./services/leboncoin.api');

let leboncoin = async (params) => {
  let data = await leboncoinApi(params);
  return data;
};

module.exports = {leboncoin};