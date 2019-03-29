const leboncoin = require('leboncoin-api');
import {logger} from 'framework';

const leboncoinApi = (params) => {
  return new Promise((resolve, reject) => {
    logger.debug(`Mode : PROD - Démarrage du crawl paramètres : [${JSON.stringify(params)}]`);
    const search = new leboncoin.Search()
    .setPage(params.page)
    .setCategory(params.category);

    search.run().then((data) => {
      return resolve(data.results);
    }, function (e) {
      return reject(`in services/leboncoin.api.js : ${e}`);
    });
  });
}

export default leboncoinApi;
