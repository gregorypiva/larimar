const leboncoin = require('leboncoin-api');

module.exports = (params) => {
  return new Promise((resolve, reject) => {
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