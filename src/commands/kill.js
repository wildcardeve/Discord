const { SlashCommandBuilder } = require('@discordjs/builders');
const { get } = require('axios');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kill')
    .setDescription('Provides the most recent kill.'),
  async execute(interaction) {
    logger.info('Querying zkill for a recent list of feeds.');
    const request = await get('https://zkillboard.com/api/kills/corporationID/98651774/');
    let nonPodKill = null;
    logger.info('Collected recent list of kill from zkill.');
    request.data.every((feed) => {
      if (feed.zkb.totalValue > 1_000_000) {
        logger.info(`Found a non-empty pod kill! Kill ID ${feed.killmail_id}`);
        nonPodKill = feed;
        return false;
      }
      return true;
    });

    await interaction.reply(`https://zkillboard.com/kill/${nonPodKill.killmail_id}`);
  },
};
