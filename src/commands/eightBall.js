const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../utils/logger');

const options = [
  'It is certain.',
  'It is decidedly so.',
  'Without a doubt.',
  'Ask Avery.',
  'Ask Priamus.',
  'Yes - definitely.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  'Cannot predict now.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Outlook not so good.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Predicts the outcome of a question.')
    .addStringOption((option) => option.setRequired(true).setName('question').setDescription('Question to ask the 8ball.')),
  async execute(interaction) {
    // eslint-disable-next-line no-underscore-dangle
    const { value } = interaction.options._hoistedOptions[0];
    logger.info(`Processing question "${value}" for an answer`);
    await interaction.reply(`Question Asked: ${value}\nAnswer: ${options[Math.floor(Math.random() * options.length)]}`);
  },
};
