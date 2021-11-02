import * as discordjs from 'discord.js';
import { Collection } from 'discord.js';
import { BotCommand, BotCommandName } from '../../utils/bot-utils';
import PartySubscription from '../../PartySubscription';

declare module 'discord.js' {
  interface Client {
    /**
     * A collection of available bot commands with an executable function.
     */
    commands: Collection<BotCommandName, BotCommand>;

    /**
     * A collection of guild party subscriptions for unique audio tracks between servers.
     */
    subscriptions: Collection<string, PartySubscription>;
  }
}
