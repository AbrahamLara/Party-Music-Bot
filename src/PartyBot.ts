import { Client } from 'discord.js';
import { BotCommandName } from './utils/bot-utils';
import { BOT_TOKEN } from '../config.json';

/**
 * The party bot class for initializing the bot in the server.
 */
class PartyBot {
  /**
   * The bot client to use for setting listeners and handling commands.
   *
   * @private
   */
  private client: Client;

  constructor(client: Client) {
    this.client = client;
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

      try {
        const command = this.client.commands.get(commandName as BotCommandName);
        // Execute command if it exists.
        if (command) {
          await command.execute(interaction);
        }
      } catch (_: any) {
        await interaction.reply(`I'm having trouble handling /${commandName}`);
      }
    });

    // Log the bot into the server.
    this.client.login(BOT_TOKEN);
  }
}

export default PartyBot;
