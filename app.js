const crawler = require('./src/crawler');
const splitter = require('./src/services/splitter');
const database = require('./src/mysql');
const request = 'INSERT INTO telephonie SET ?';
const config = require('./config');

/* 
  Mise en forme de la data :
    {
      "url": []
      "model": []
      "price": []
      "status": []
      "color": []
      "memory": []
      "date": []
      "location": []
      "latitude": []
      "longitude": []
    }
*/

let params = config.params;

const crawl = async () => {
  try {
    const mysql = new database();
    let data = await crawler.leboncoin(params);
    data = await splitter.leboncoin(data);
    await mysql.register(data);
    await mysql.close();
  } catch (e) { console.log(e) }
}

const start = async () => {
  while (params.page <= params.maxpage) {
    await crawl();
    params.page++;
  }
}

start();