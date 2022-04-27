const { get } = require("axios");
const logger = require("../utils/logger");

const getAllianceDetailsFromESI = async (allianceId, characterName) => {
  if (allianceId == null) {
    logger.info(
      `No allianceID for ${characterName}. Returning no alliance string.`
    );
    return "No Alliance";
  }

  logger.info(`Finding alliance details for: ${allianceId} from CCP.`);

  const response = await get(
    `https://esi.evetech.net/latest/alliances/${allianceId}/?datasource=tranquility`
  );
  const { name, ticker } = response.data;

  logger.info(`Alliance name for ${allianceId} is ${name} [${ticker}]`);

  return `${name} [${ticker}]`;
};

module.exports = getAllianceDetailsFromESI;
