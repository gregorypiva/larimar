const config = require('../config');

const leboncoinApi = require('./fakeServices/leboncoin.fakeapi');

let leboncoin = async (params) => {
  try {
    let data = await leboncoinApi(params);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports = {leboncoin};