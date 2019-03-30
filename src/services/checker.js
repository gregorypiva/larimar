import {logger, config, bdd} from 'framework';
import {crawler} from 'services/crawler';

const check = async () => {
  logger.debug('Vérification de la validité des annonces', 'checker.js');
  let data = null;
  try {
    data = await bdd.query(request);
    const test = await crawler.leboncoin({page: '1592509324'});
    logger.debug(test);
  } catch (e) {
    return Promise.reject(e);
  }
  logger.debug('Nombre d\'annonces à analyser : ' + data.length);
}

const request = `
SELECT
    X.url,
    model.model,
    X.price,
    X.status,
    X.memory,
    model.id,
    X.color,
    ecart_type,
    avgp.avgprice,
    site.name,
    model.builder,
    X.date,
    X.location
FROM
    telephonie AS X
INNER JOIN
    (
    SELECT
        t.model,
        MIN(price) AS min_price,
        avgprice - MIN(price) AS ecart_type,
        AT.avgprice,
        t.status,
        t.memory
    FROM
        telephonie AS t
    INNER JOIN
        avgprice_telephonie AT
    ON
        t.model = AT.id_model AND t.status = AT.status AND t.memory = AT.memory
    WHERE
        t.status > 0 AND t.status < 6 AND t.memory > 0 AND DATE_FORMAT(AT.date, '01-%m-%Y') = DATE_FORMAT(NOW(), '01-%m-%Y')
    GROUP BY
        t.model,
        t.status,
        t.memory) z
    ON
        X.model = z.model AND X.price = z.min_price AND X.status = z.status AND X.memory = z.memory
    LEFT JOIN
        avgprice_telephonie AS avgp
    ON
        avgp.id_model = X.model AND avgp.status = X.status AND avgp.memory = X.memory
    LEFT JOIN
        model
    ON
        model.id = X.model
    LEFT JOIN
        site
    ON
        X.id_site = site.id
    WHERE
        X.valid = 1 AND X.status > 0 AND X.status < 6 AND X.memory > 0 AND DATE_FORMAT(avgp.date, '01-%m-%Y') = DATE_FORMAT(NOW(), '01-%m-%Y') AND DATE_FORMAT(X.date, '%d-%m-%Y') > DATE_FORMAT(NOW() - INTERVAL 7 DAY, '%d-%m-%Y')
    GROUP BY
        X.model
    ORDER BY
        z.ecart_type
    DESC
LIMIT 10
`;

export default {
  check
};