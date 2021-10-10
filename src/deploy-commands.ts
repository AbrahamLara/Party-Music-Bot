import fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import path from 'path';
import { BOT_TOKEN, CLIENT_ID, GUILD_ID } from '../config.json';

// An array of available bot commands.
export const commands: any[] = [];
const commandFiles = fs.readdirSync(path.join(__dirname, '/commands'));
// Loop through the command files to convert the bot commands into json to include in our PUT request that will update
// the bot commands.
for (const file of commandFiles) {
  const command = require(path.join(__dirname, `/commands/${file}`)).default;
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);
// Using the discord REST API lets set the commands the bot should respond to. This should only be done when adding
// or removing commands.
rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
