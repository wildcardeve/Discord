const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apply")
    .setDescription(
      "Makes a room for the potential applicant. (requires recruiter permissions"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user").setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options._hoistedOptions[0];
    const recruiter = "737696484866392165";
    const command = "752710795623923812";
    const guildRef = interaction.guild;
    const basePermissions = [
      Permissions.FLAGS.VIEW_CHANNEL,
      Permissions.FLAGS.SEND_MESSAGES,
      Permissions.FLAGS.ADD_REACTIONS,
      Permissions.FLAGS.READ_MESSAGE_HISTORY,
      Permissions.FLAGS.EMBED_LINKS,
    ];

    await interaction(
      guildRef.channels.permissionOverwrites.create(
        `${user}-applicant-meeting`,
        {
          category: "RECRUITMENT",
          permissionOverwrites: [
            {
              id: guildRef.id,
              deny: [Permissions.FLAGS.VIEW_CHANNEL],
            },
            {
              id: user.id,
              allow: basePermissions,
            },
            {
              id: recruiter,
              allow: [...basePermissions, Permissions.FLAGS.MANAGE_CHANNEL],
            },
            {
              id: command,
              allow: [...basePermissions, Permissions.FLAGS.MANAGE_CHANNEL],
            },
          ],
        }
      ),
      interaction.message.cache
        .get(`${user}-applicant-meeting`)
        .send(`https://wildcardeve.com/`)
    );
  },
};
