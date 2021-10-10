import { Client, Collection } from 'discord.js';
import { BotCommand, BotCommandName } from './utils/bot-utils';
import { BOT_TOKEN } from '../config.json';
import { BotManager } from './BotManager';

/**
 * The party bot class for initializing the bot in the server.
 */
class PartyBot {
  private client: Client;

  private commands: Collection<BotCommandName, BotCommand>;

  constructor(botManager: BotManager) {
    this.client = botManager.client;
    this.commands = botManager.commands;
  }

  /**
   * This initializes the bot with with command a ready/commands listener and logs the bot in to the server.
   */
  init() {
    this.client.once('ready', () => {
      console.log('Party bot ready!');
    });

    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return;

      // Use the command name provided from the interaction to retrieve the command object.
      const { commandName } = interaction;
      const command = this.commands.get(commandName as BotCommandName);

      try {
        // If the command doesn't exist, do nothing.
        if (!command) return;
        // Execute the command.
        await command.execute(interaction);
      } catch (_: any) {
        await interaction.reply(`I'm having trouble handling /${commandName}`);
      }
    });

    // Log the bot into the server.
    this.client.login(BOT_TOKEN);
  }
}

export default PartyBot;
