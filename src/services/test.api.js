const leboncoin = require('leboncoin-api');
const fs = require('fs');

const leboncoinApi = (page, category) => {
  return new Promise((resolve, reject) => {
    const search = new leboncoin.Search()
    .setPage(page)
    .setCategory(category);

    search.run().then((data) => {
      fs.writeFile("test.txt", JSON.stringify(data), function(err, data) {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
      });
      return resolve(data.results);
    }, function (e) {
      console.log('erreur 1');
    });
  });
}

leboncoinApi(1, "telephonie");
