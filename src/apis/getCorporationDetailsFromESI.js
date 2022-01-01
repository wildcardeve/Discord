const { get } = require('axios');
const logger = require('../utils/logger');

const getCorpDetailsFromESI = async (corpId, characterName) => {
  if (corpId == null) {
    logger.info(`No corpId for ${characterName}. Returning no corporation string.`);
    return 'No Corporation';
  }

  logger.info(`Finding corporation details for: ${corpId} from CCP.`);

  const response = await get(`https://esi.evetech.net/latest/corporations/${corpId}/?datasource=tranquility`); const { name, ticker } = response.data;

  logger.info(`Corp name for ${corpId} is ${name} [${ticker}]`);

  return `${name} [${ticker}]`;
};

module.exports = getCorpDetailsFromESI;
