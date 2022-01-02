const { get } = require('axios');
const addCommasToPrice = require('../utils/addCommasToPrice');
const logger = require('../utils/logger');

const getItemPrice = async (itemId) => {
  logger.info(`Finding item price info for item id: ${itemId.id} from EVE Marketer.`);

  const jitaPriceRequest = await get(`https://api.evemarketer.com/ec/marketstat/json?typeid=${itemId.id}&usesystem=30000142`);

  const amarrPriceRequest = await get(`https://api.evemarketer.com/ec/marketstat/json?typeid=${itemId.id}&usesystem=30002187`);

  logger.info(`Found price data for ${itemId.name} in Jita and Amarr`);

  return {
    jitaSell: addCommasToPrice(jitaPriceRequest?.data[0].sell.min),
    jitaBuy: addCommasToPrice(jitaPriceRequest?.data[0].buy.max),
    amarrSell: addCommasToPrice(amarrPriceRequest?.data[0].sell.min),
    amarrBuy: addCommasToPrice(amarrPriceRequest?.data[0].buy.max),
    itemName: itemId.name,
  };
};

module.exports = getItemPrice;
