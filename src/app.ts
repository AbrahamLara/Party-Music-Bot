import fs from 'fs';
import path from 'path';
import { Collection, Intents } from 'discord.js';
import PartyBot from './PartyBot';
import { BotManager } from './BotManager';

// Create a new client instance.
const client = new BotManager({ intents: [Intents.FLAGS.GUILDS] });
// Create a commands object in the client.
client.commands = new Collection();

// Retrieve all the command files.
const commandFiles = fs.readdirSync(path.join(__dirname, '/commands'));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, `/commands/${file}`)).default;

  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// Pass the client instance to the bot and initialize it.
const bot = new PartyBot(client);
bot.init();
