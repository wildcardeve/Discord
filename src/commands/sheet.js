const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sheet")
    .setDescription("Provides a link to the doctrine sheet."),
  async execute(interaction) {
    await interaction.reply(
      "https://docs.google.com/spreadsheets/d/1vQh1yvvaL0RiezbaPyfutnEQ9CzgBhS-dTHOB9lYcc8/edit?usp=sharing"
    );
  },
};
