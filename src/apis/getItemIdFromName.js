const axios = require("axios");
const logger = require("../utils/logger");

const getItemIdFromName = async (item) => {
  logger.info(`Getting item id for ${item}`);
  const requestBody = [item];

  const request = await axios({
    method: "post",
    url: "https://esi.evetech.net/latest/universe/ids/?datasource=tranquility&language=en",
    headers: {},
    data: requestBody,
  });

  const response = request?.data;

  if (Object.keys(response).length === 0 || response.inventory_types == null) {
    logger.error(
      `Item was not found, or is not an inventory type: ${JSON.stringify(
        response
      )}`
    );
    throw new Error(`No results for item ${item}, please check spelling.`);
  }

  const itemDetails = response?.inventory_types[0];
  logger.info(`Item details for ${item} are ${JSON.stringify(itemDetails)}`);
  return itemDetails;
};

module.exports = getItemIdFromName;
