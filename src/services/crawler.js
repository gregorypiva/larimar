import leboncoinApi from 'services/leboncoin.api';

const leboncoin = async (params) => {
  try {
    let data = await leboncoinApi(params);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(`in crawler.js - parameters [${params}] : ${e}`);
  }
};

export const crawler = {
  leboncoin
}