const { SlashCommandBuilder } = require('@discordjs/builders');
const { get } = require('axios');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('feed')
    .setDescription('Provides the most recent feed.'),
  async execute(interaction) {
    logger.info('Querying zkill for a recent list of feeds.');
    const request = await get('https://zkillboard.com/api/losses/corporationID/98651774/');
    let nonPodFeed = null;
    logger.info('Collected recent list of feeds from zkill.');
    request.data.every((feed) => {
      if (feed.zkb.totalValue > 1_000_000) {
        logger.info(`Found a non-empty pod feed! Kill ID ${feed.killmail_id}`);
        nonPodFeed = feed;
        return false;
      }
      return true;
    });

    await interaction.reply(`https://zkillboard.com/kill/${nonPodFeed.killmail_id}`);
  },
};
