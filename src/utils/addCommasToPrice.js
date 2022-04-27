const addCommasToPrice = (priceString) =>
  priceString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

module.exports = addCommasToPrice;
