import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Interaction } from 'discord.js';
/**
 * A set of available bot command names.
 */
export enum BotCommandName {
  PLAY = 'play',
  LEAVE = 'leave',
  JOIN = 'join'
}

// An object of bot command descriptions.
export const BOT_COMMAND_DESCRIPTION: Record<BotCommandName, string> = {
  [BotCommandName.PLAY]: 'Plays a youtube video given a url or search term',
  [BotCommandName.LEAVE]: 'Makes the bot leave a server channel',
  [BotCommandName.JOIN]: 'Makes the bot join a server channel',
};

/**
 * An executable bot command.
 */
export interface BotCommand {
  /**
   * The slash command builder that creates a command for the bot to recognize.
   */
  data: SlashCommandBuilder;

  /**
   * The function to call for a bot command.
   *
   * @param interaction An interaction object.
   */
  execute: (interaction: Interaction) => Promise<void>;
}

/**
 * Returns a slack command builder object.
 *
 * @param name The command name.
 */
export function newSlashCommand(name: BotCommandName) {
  return new SlashCommandBuilder()
    .setName(name)
    .setDescription(BOT_COMMAND_DESCRIPTION[name]);
}
