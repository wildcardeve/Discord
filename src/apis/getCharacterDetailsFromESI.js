const { get } = require('axios');
const logger = require('../utils/logger');

const getCharacterDetailsFromESI = async (characterID, characterName) => {
  logger.info(`Finding character details for: ${characterID[0]} from CCP.`);

  const response = await get(`https://esi.evetech.net/latest/characters/${characterID[0]}/?datasource=tranquility`);

  const characterDetails = response.data;

  if (characterDetails == null) throw new Error(`Unable to find character details for character: ${characterName}.`);

  logger.info(`Found character details for ${characterName}: ${JSON.stringify(characterDetails)}`);

  return characterDetails;
};

module.exports = getCharacterDetailsFromESI;
