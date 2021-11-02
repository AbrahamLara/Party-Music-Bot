import fs from 'fs';
import path from 'path';
import { Client, Collection, Intents } from 'discord.js';
import PartyBot from './PartyBot';
import { setClient } from './utils/client-utils';

/** Create a new client instance.
 *
 * Flags:
 * GUILDS -
 * GUILD_VOICE_STATES -
 * GUILD_MESSAGES -
 */
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
// Give the client object a collection for setting bot commands to make us of later.
client.commands = new Collection();
client.subscriptions = new Collection();
setClient(client);

// Retrieve all the command files.
const commandFiles = fs.readdirSync(path.join(__dirname, '/commands'));
// Loop through the command files to convert the bot commands into json to add the bot commands to the client object's
// commands collection object.
for (const file of commandFiles) {
  const command = require(path.join(__dirname, `/commands/${file}`)).default;
  // With the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

// Pass the client instance to the bot and initialize it.
const bot = new PartyBot(client);
bot.init();
