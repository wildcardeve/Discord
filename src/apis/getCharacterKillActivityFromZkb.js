const { get } = require("axios");
const logger = require("../utils/logger");

const getCharacterKillActivityFromZkb = async (characterId, characterName) => {
  logger.info(`Finding kill activity details for: ${characterName} from CCP.`);

  const request = await get(
    `https://zkillboard.com/api/stats/characterID/${characterId}/`
  );

  const { shipsLost, shipsDestroyed, soloKills } = request.data;

  const activityResponseObject = {
    shipsLost,
    shipsDestroyed,
    soloKills,
    isActive: Object.keys(request.data.activepvp).length !== 0,
    killboardLink: `https://zkillboard.com/character/${characterId}/`,
  };

  logger.info(
    `Found kill activity for ${characterName}. ${JSON.stringify(
      activityResponseObject
    )}`
  );

  return activityResponseObject;
};

module.exports = getCharacterKillActivityFromZkb;
