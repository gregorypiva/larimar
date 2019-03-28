import leboncoinApi from 'services/leboncoin.api';

console.log(leboncoinApi);

const leboncoin = async (params) => {
  try {
    let data = 'await leboncoinApi(params)';
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const crawler = {
  leboncoin
}