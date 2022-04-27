const { SlashCommandBuilder, bold } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const getAllianceDetailsFromESI = require("../apis/getAllianceDetailsFromESI");
const getCharacterDetailsFromESI = require("../apis/getCharacterDetailsFromESI");
const getCharacterIDFromESI = require("../apis/getCharacterIDFromESI");
const getCharacterKillActivityFromZkb = require("../apis/getCharacterKillActivityFromZkb");
const getCorpDetailsFromESI = require("../apis/getCorporationDetailsFromESI");
const logger = require("../utils/logger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("who")
    .setDescription(
      "Displays information on the provided EVE Online character."
    )
    .addStringOption((option) =>
      option
        .setRequired(true)
        .setName("name")
        .setDescription("EVE Online Character")
    ),
  async execute(interaction) {
    // eslint-disable-next-line no-underscore-dangle
    const { value } = interaction.options._hoistedOptions[0];

    logger.info(`Building embedded who response for character: '${value}'`);

    const characterId = await getCharacterIDFromESI(value);
    const characterDetails = await getCharacterDetailsFromESI(
      characterId,
      value
    );
    const killActivity = await getCharacterKillActivityFromZkb(
      characterId,
      value
    );
    const corpDetails = await getCorpDetailsFromESI(
      characterDetails.corporation_id,
      value
    );
    const allianceDetails = await getAllianceDetailsFromESI(
      characterDetails.alliance_id,
      value
    );

    const embedResponse = new MessageEmbed()
      .setColor("#32BF84")
      .setTitle(`${value}`)
      .setThumbnail(
        `https://images.evetech.net/characters/${characterId}/portrait`
      )
      .setURL(killActivity.killboardLink)
      .setDescription(`${bold(corpDetails)}\n${bold(allianceDetails)}`)
      .addFields(
        {
          name: "Active Recently?",
          value: `${killActivity.isActive ? "Yes" : "No"}`,
        },
        {
          name: "Kills: ",
          value: `${killActivity.shipsDestroyed}`,
          inline: true,
        },
        { name: "Losses: ", value: `${killActivity.shipsLost}`, inline: true },
        {
          name: "Solo Kills: ",
          value: `${killActivity.soloKills}`,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({
        text: "Send ISK donations to Wildcard.",
        iconURL: "https://images.evetech.net/Corporation/98651774_64.png",
      });

    logger.info(`Sending embeded 'who' response for character: '${value}'`);
    await interaction.reply({ embeds: [embedResponse] });
  },
};
