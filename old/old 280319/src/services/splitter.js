import {logger, config, bdd} from 'framework';

const models = {
  iphone: /^(?:apple\s+)?(?<model>i\s?-?phone?s?\s?(?:[3-8]{1}\s?g?s?e?\s?(?:plus|\+)?c?|se|x))(?![a-z])/i,
  samsung: /^(?:(?:sa[nm]su[nm]g?\s+)?(?:galax(?:y|ie)\s+)?)?(?<model>(?:s|note|j|e|a|c){1}\s?[1-9]\s?(?:mini|edge)?)/i,
  sony: /^(?:son[yi]|xperia)(?:\s+xperia)?\s+(?<model>Z3|XZ)(?![a-z])/i,
}

const modelError = `^(?:
  [2-9]|
  (?:une|deux|trois|quatre|cinq|six|sept|huit)|
  adaptateur|
  baladeur|
  batt?erie?|
  bo[iîï]ti?e?r?|
  bracel[ée]t?|
  c[aâ]+ble|
  cache|
  cartouche|
  casque|
  changement|
  chargeur|
  ch[aâàä]ss?ie?|
  coque|
  dock|
  [éeè]change?|
  [ée]couteur|
  [éeè]cr[a-z]n|
  [[éeè]tui|
  face|
  haut parleur|
  hous?se|
  [kl]it|
  lots?|
  lun[éeè]tt?e|
  montre|
  mp3|
  oreill?ett?e|
  p[éeè]rche|
  pi[éeè]+ces?|
  porte|
  Prot[éeè](?:ges?|ction)|
  remplaceme?nt?|
  recharge|
  r[éeè]+parat(?:eur|ion)|
  station|
  stic?kere?|
  supp?ort?|
  verr?e|
  vitre
s?)`;

const etat = {
  8: /(?:pour)?\s?pi[éeè]+ces?\s?(?:d[éeè]+tach[éeè]+e?s?)?|hs|(non?|pas)\s?fonction?nel/i,
  7: /cass?[èée]+|fiss?urr?[éeè]+/i,
  3: /parfait|irr?[éeè]+pp?rochable|[eéè]xcell?ent|tr[éeè]+s?\s+bon/i,
  6: /bon\s[éeè]+ta/i,
  2: /(comm?e|quasis?)\s?neuf/i,
  1: /neuf/i,
}

const colors = {
  12: /rouge|red/i,
  11: /jet\s?black|(noir|black)\s?(de)?\s?ja[iîï]s?/i,
  10: /((gold|or)\s?(rose|pink))|((rose|pink)\s?(gold|or))/i,
  9: /(spaces?)?\s?gr(a|e)y|gris?\s?sid[éeè]+ral/i,
  8: /silver|argent/i,
  7: /gold|or(?![a-z])/i,
  6: /green|vert/i,
  5: /pink|rose/i,
  4: /blue|bleu/i,
  3: /yellow|jaune/i,
  2: /white|blanc/i,
  1: /black|noir/i,
}

const memories = /(8|16|32|64|128|256|512)\s?(?:go?b?|giga)/i;

const model = (model) => {
  let value;
  let regexError = new RegExp(modelError.replace(/[\s\r\n]+/g, ''), 'i');
  for (let regex in models) {
      if (value) break;
      if (regexError.test(model)) break;
      value = model.match(models[regex]);
  }
  return (value) ? value.groups.model : null;
};

const idModel = async (data) => {
  const response = [];
  for (let element of data) {
    if (!element.model) continue;
    element.model = element.model.replace(/\+/g, 'plus');
    element.model = element.model.replace(/\s+/g, '');
    element.model = await bdd.query(`
    SELECT id, model FROM model
    WHERE replace(model, " ", "") = "${element.model}"
    OR replace(concat(builder, model), " ", "") = "${element.model}"
    `);
    if (element.model) response.push(element.model);
  }
  console.log(response);
  return response;
};

const status = (status) => {
  let value;
  for (let regex in etat) {
      if (value) break;
      if (status.match(etat[regex])) value = regex;
  }
  return (value) ? value : 0;
};

const url = (url) => {
  return url.match(/\/([0-9]+)\.htm/)[1];
};

const color = (color) => {
  let value;
  for (let regex in colors) {
    if (value) break;
    if (color.match(colors[regex])) value = regex;
  }
  return (value) ? value : 0;
}

const memory = (memory) => {
  let value = memory.match(memories);
  return value ? value[1] : 0;
}

const date = (date) => {
  if (typeof date !== 'string') date = JSON.stringify(date);
  return date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0];
}

const dataFormat = (data) => {
  const response = [];
  for (let element of data) {
    const value = {
      id_site: 1,
      url: element.id || url(element.link),
      model: model(element.title),
      price:  element.price || null,
      status: status(element.title),
      color:  color(element.title),
      memory: memory(element.title),
      date:   date(element.date) || null,
      location:  element.location.city || null,
      zipcode:  element.location.zipcode || null,
      latitude: element.location.lat || null,
      longitude:  element.location.lng || null,
      valid: 1,
    }
    if (value.model && value.price) response.push(value);
  }
  return Promise.resolve(response);
}

// On fournit un array qui contient tous les objects
const leboncoin = async (data) => {
  try {
    logger.debug('Démarrage du split des données', 'splitter.js');
    data = await dataFormat(data);
    logger.debug('Données formatées', 'splitter.js');
    logger.info(data);
    data = await idModel(data);
    logger.debug('Récupération de l\'idModel', 'splitter.js');
    return data;
  } catch (e) {
    logger.error(e, 'splitter.js', '0x001');
  }

};

export default {
  leboncoin
};