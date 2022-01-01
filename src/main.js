/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '.env') });
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const logger = require('./utils/logger');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
logger.info('Wildcard Discord bot is starting.');

client.commands = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, './commands')).filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  logger.info(`Registering file: ${file} as a slash command.`);
  const command = require(path.join(__dirname, 'commands', file));
  client.commands.set(command.data.name, command);
});

client.once('ready', () => {
  logger.info('Wildcard Discord bot is now running.');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    logger.error('Command %s is not a valid command', interaction.command);
    return;
  }

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    logger.error('Command %s is not a valid command', command);
    return;
  }

  try {
    logger.info(`User: '${interaction.user.username}' is executing command: '${interaction.commandName}' in channel: '${interaction.channel.name}'`);
    await command.execute(interaction);
  } catch (error) {
    logger.error(`There was an error executing command: '${interaction.commandName}' by user: '${interaction.user.username}' in channel: '${interaction.channel.name}'`);
    logger.error(error);
    await interaction.reply({ content: error.toString(), ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
