const { get } = require('axios');
const logger = require('../utils/logger');

const getCharacterIDFromESI = async (characterName) => {
  logger.info(`Finding character info for: ${characterName} from CCP.`);

  const response = await get(`https://esi.evetech.net/latest/search/?categories=character&datasource=tranquility&language=en-us&search=${characterName}&strict=true`);

  const characterID = response.data.character;

  logger.info(`Character ID for ${characterName} is ${characterID}`);

  if (characterID == null) throw new Error(`Unable to find character info for ${characterName}.`);

  return characterID;
};

module.exports = getCharacterIDFromESI;
