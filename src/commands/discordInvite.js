const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Provides an invite to the Wildcard discord server."),
  async execute(interaction) {
    await interaction.reply("https://discord.gg/jftcgfP");
  },
};
