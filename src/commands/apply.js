const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {

    data: new SlashCommandBuilder()
        .setName('apply')
        .setDescription('Makes a room for the potential applicant. (requires recruiter permissions')
        .addUserOption(option => option.setName('user').setDescription('The user').setRequired(true)),
    async execute(interaction) {
        const guildId = interaction.guild_id
        const user = interaction.options._hoistedOptions[0]
        const recruiter = '737696484866392165'
        const command = '752710795623923812'
        const STANDARD_PERMS = {
            allow: Permissions.FLAGS.VIEW_CHANNEL,
            allow: Permissions.FLAGS.SEND_MESSAGES,
            allow: Permissions.FLAGS.ADD_REACTIONS,
            allow: Permissions.FLAGS.READ_MESSAGE_HISTORY,
            allow: Permissions.FLAGS.EMBED_LINKS
        }
        await interaction(
            guildId.channels.permissionOverwrites.create(`${user}-applicant-meeting`, {
                category: 'RECRUITMENT',
                permissionOverwrites: [{
                        id: guildId,
                        deny: [Permissions.FLAGS.VIEW_CHANNEL]
                    },
                    {
                        id: user.id,
                        STANDARD_PERMS
                    },
                    {
                        id: recruiter,
                        STANDARD_PERMS,
                        allow: Permissions.FLAGS.MANAGE_CHANNEL
                    },
                    {
                        id: command,
                        STANDARD_PERMS,
                        allow: Permissions.FLAGS.MANAGE_CHANNEL
                    }
                ]
            }), newChan = clients.channels.cache.get(`${user}-applicant-meeting`),
            message.newChan.send(`https://wildcardeve.com/`)
        )
    }
};