const { SlashCommandBuilder } = require("@discordjs/builders")

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

        await interaction(
            interaction.guild.channels.create(
                `${user.username}-applicant-meeting`, {
                    parent: '767531267641180180',
                }
            ).then(channel => channel.send(`\n
            Please apply on our website!\n
            Ping @here when you are ready to have your application reviewed.\n
            https://wildcardeve.com/`)),
        );
    },
};