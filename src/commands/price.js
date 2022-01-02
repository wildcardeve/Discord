const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const getItemIdFromName = require('../apis/getItemIdFromName');
const getItemPrice = require('../apis/getItemPrice');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('price')
    .setDescription('Provides the price of an item at various EVE Online trade hubs.')
    .addStringOption((option) => option.setRequired(true).setName('item').setDescription('Item to pricecheck.')),
  async execute(interaction) {
    // eslint-disable-next-line no-underscore-dangle
    const { value } = interaction.options._hoistedOptions[0];

    const item = await getItemIdFromName(value);
    const priceData = await getItemPrice(item);
    logger.info(`Building embedded response for price data on ${value}`);
    const embeddedResponse = new MessageEmbed()
      .setColor('#32BF84')
      .setTitle(priceData.itemName.toString())
      .setThumbnail(`https://images.evetech.net/types/${item.id}/render?size=128`)
      .addFields(
        { name: 'Jita Sell: ', value: priceData.jitaSell.toString() },
        { name: 'Jita Buy: ', value: priceData.jitaBuy.toString() },
        { name: 'Amarr Sell: ', value: priceData.amarrSell.toString() },
        { name: 'Amarr Buy: ', value: priceData.amarrBuy.toString() },
      )
      .setTimestamp()
      .setFooter({
        text: 'Send ISK donations to Wildcard.',
        iconURL: 'https://images.evetech.net/Corporation/98651774_64.png',
      });
    logger.info(`Sending embedded response for price data on ${value}`);
    await interaction.reply({ embeds: [embeddedResponse] });
  },
};
