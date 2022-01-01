const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('time')
    .setDescription('Displays the current EVE time and a variety of timezones.'),
  async execute(interaction) {
    await interaction.reply('time!');
  },
};
