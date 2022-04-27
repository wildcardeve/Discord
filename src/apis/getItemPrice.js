const { get } = require("axios");
const addCommasToPrice = require("../utils/addCommasToPrice");
const logger = require("../utils/logger");

const getItemPrice = async (itemId) => {
  logger.info(
    `Finding item price info for item id: ${itemId.id} from EVE Marketer.`
  );

  const priceRequest = await get(
    `https://evetycoon.com/api/v1/market/orders/${itemId.id}`
  );

  const priceResponse = await priceRequest.data;
  const jitaSellOrders = [];

  for (let i = 0; i < priceResponse.orders.length; i++) {
    const priceObject = priceResponse.orders[i];
    if (priceObject.systemId === 30000142 && !priceObject.isBuyOrder) {
      jitaSellOrders.push(priceObject);
    }
  }

  jitaSellOrders.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  return {
    jitaSell: addCommasToPrice(jitaSellOrders[0]?.price),
    itemName: priceResponse?.itemType?.typeName,
  };
};

module.exports = getItemPrice;
