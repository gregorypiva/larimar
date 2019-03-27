const leboncoin = require('leboncoin-api');
const logger = require('../logger');
const log = new logger.log();

module.exports = (params) => {
  return new Promise((resolve, reject) => {
    log.debug('Mode : PROD - Démarrage du crawl');
    const search = new leboncoin.Search()
    .setPage(params.page)
    .setCategory(params.category);

    search.run().then((data) => {
      resolve(data.results);
    }, function (err) {
      reject(err);
    });
  });
}