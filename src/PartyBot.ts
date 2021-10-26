import { Client } from 'discord.js';
import { BOT_TOKEN } from '../config.json';
import { getBotCommandDetails } from './utils/message-utils';

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

    this.client.on('messageCreate', async message => {
      const botCommandDetails = getBotCommandDetails(message.content);
      // If we were not able to extract a bot command name, the user is not attempting to use the music bot and the bot
      // should do nothing.
      if (!botCommandDetails) return;

      try {
        const { name, value } = botCommandDetails;
        // Use the command name provided from the interaction to retrieve the command object.
        const command = this.client.commands.get(name);
        // Execute command if it exists.
        if (command) {
          await command.execute(message, value);
        }
      } catch (error) {
        await message.reply(
          `I'm having trouble handling /${botCommandDetails}`,
        );
      }
    });

    // Log the bot into the server.
    this.client.login(BOT_TOKEN);
  }
}

export default PartyBot;
