const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("apply")
        .setDescription(
            "Makes a room for the potential applicant. (requires recruiter permissions)"
        )
        .addUserOption((option) =>
            option.setName("user").setDescription("The user").setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const basePermissions = [
            Permissions.FLAGS.VIEW_CHANNEL,
            Permissions.FLAGS.SEND_MESSAGES,
            Permissions.FLAGS.ADD_REACTIONS,
            Permissions.FLAGS.READ_MESSAGE_HISTORY,
            Permissions.FLAGS.EMBED_LINKS,
        ];

        await interaction(
            interaction.guild.channels.create(
                `${user.username}-applicant-meeting`, {
                    parent: '767531267641180180',
                    permissionOverwrites: [{
                            id: "737695395794256023",
                            deny: [basePermissions]
                        },
                        {
                            id: user,
                            allow: [basePermissions]
                        },
                        {
                            id: "737696484866392165",
                            allow: [basePermissions, Permissions.FLAGS.MANAGE_CHANNELS]
                        }
                    ]
                }
            ).then(
                channel => channel.send(`
            Please apply on our website! Ping here when you are ready to have your application reviewed.\n
            https://wildcardeve.com/`)
            )
        );
    },
};