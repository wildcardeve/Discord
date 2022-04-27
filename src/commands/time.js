const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { DateTime } = require("luxon");
const logger = require("../utils/logger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription(
      "Displays the current EVE time and a variety of timezones."
    ),
  async execute(interaction) {
    const embeddedResponse = new MessageEmbed()
      .setColor("#32BF84")
      .addFields(
        {
          name: "EVE Time: ",
          value: DateTime.now().setZone("utc").toFormat("HH:mm"),
          inline: true,
        },
        {
          name: "China: ",
          value: DateTime.now().setZone("HongKong").toFormat("HH:mm"),
          inline: true,
        },
        {
          name: "Germany: ",
          value: DateTime.now().setZone("Europe/Berlin").toFormat("HH:mm"),
          inline: true,
        },
        {
          name: "US East: ",
          value: DateTime.now().setZone("America/New_York").toFormat("HH:mm"),
          inline: true,
        },
        {
          name: "US Central: ",
          value: DateTime.now().setZone("America/Chicago").toFormat("HH:mm"),
          inline: true,
        },
        {
          name: "US West: ",
          value: DateTime.now()
            .setZone("America/Los_Angeles")
            .toFormat("HH:mm"),
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({
        text: "Send ISK donations to Wildcard.",
        iconURL: "https://images.evetech.net/Corporation/98651774_64.png",
      });
    logger.info("Generating time message.");
    await interaction.reply({ embeds: [embeddedResponse] });
    logger.info("Completed time message.");
  },
};
