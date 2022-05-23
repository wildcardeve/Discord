const { SlashCommandBuilder } = require("@discordjs/builders");
const logger = require("../utils/logger");

module.exports = {

    command: new SlashCommandBuilder()
        .setName('apply')
        .setDescription('Makes a room for the potential applicant. (requires recruiter permissions')
        .addUserOption(option => option.setName('user').setDescription('The user').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options._hoistedOptions[0]
        const recruiter = '737696484866392165'
        const command = '752710795623923812'
        await interaction(
            guild.channels.permissionOverwrites.create(`${user}-applicant-meeting`, {
                category: 'RECRUITMENT',
                permissionOverwrites: [{
                        id: guild.id,
                        deny: [Permissions.FLAGS.VIEW_CHANNEL]
                    },
                    {
                        id: user.id,
                        allow: Permissions.FLAGS.VIEW_CHANNEL,
                        allow: Permissions.FLAGS.SEND_MESSAGES,
                        allow: Permissions.FLAGS.ADD_REACTIONS,
                        allow: Permissions.FLAGS.READ_MESSAGE_HISTORY,
                        allow: Permissions.FLAGS.EMBED_LINKS
                    },
                    {
                        id: recruiter,
                        allow: Permissions.FLAGS.VIEW_CHANNEL,
                        allow: Permissions.FLAGS.SEND_MESSAGES,
                        allow: Permissions.FLAGS.ADD_REACTIONS,
                        allow: Permissions.FLAGS.READ_MESSAGE_HISTORY,
                        allow: Permissions.FLAGS.EMBED_LINKS,
                        allow: Permissions.FLAGS.MANAGE_CHANNEL
                    },
                    {
                        id: command,
                        allow: Permissions.FLAGS.VIEW_CHANNEL,
                        allow: Permissions.FLAGS.SEND_MESSAGES,
                        allow: Permissions.FLAGS.ADD_REACTIONS,
                        allow: Permissions.FLAGS.READ_MESSAGE_HISTORY,
                        allow: Permissions.FLAGS.EMBED_LINKS,
                        allow: Permissions.FLAGS.MANAGE_CHANNEL
                    }
                ]
            }), newChan = clients.channels.cache.get(`${user}-applicant-meeting`),
            message.newChan.send(`https://wildcardeve.com/`)
        )
    }
}