import { Client, ClientOptions, Collection } from 'discord.js';
import { BotCommand, BotCommandName } from './utils/bot-utils';

/**
 * A bot manager that allows us to add custom properties to the existing discord client.
 */
export class BotManager {
  /**
   * The discord client.
   */
  client: Client;

  constructor(options: ClientOptions) {
    this.client = new Client<boolean>(options);
  }

  /**
   * A collection of available bot commands with an executable function.
   */
  commands = new Collection<BotCommandName, BotCommand>();
}
