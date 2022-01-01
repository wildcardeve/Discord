/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '../', '.env') });
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const logger = require('./logger');

const commands = [];

const commandFiles = fs.readdirSync(path.join(__dirname, '../', 'commands')).filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const command = require(path.join(__dirname, '../', 'commands', file));
  commands.push(command.data.toJSON());
});

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(
  process.env.DISCORD_CLIENT_ID,
  process.env.DISCORD_SERVER_ID,
), { body: commands })
  .then(() => logger.info('Successfully registered application commands.'))
  .catch(logger.error);
