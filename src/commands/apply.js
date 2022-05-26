const { SlashCommandBuilder } = require("@discordjs/builders");
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
        const everyone = "737695395794256023"
        const recruiter = "737696484866392165";
        const command = "752710795623923812";
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
                    permissionOverwrites: [{
                            id: everyone,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: user,
                            allow: [basePermissions, Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: recruiter,
                            allow: [basePermissions, Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: command,
                            allow: [basePermissions, Permissions.FLAGS.VIEW_CHANNEL]
                        },
                    ]
                }
            ).then(channel => channel.send(`Please apply on our website!\n
            Ping @here when you are ready to have your application reviewed.\n
            https://wildcardeve.com/`)),
        );
    },
};