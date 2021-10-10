import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

/**
 * A set of available bot command names.
 */
export enum BotCommandName {
  PLAY = 'play',
  LEAVE = 'leave',
}

// An object of bot command descriptions.
export const BOT_COMMAND_DESCRIPTION: Record<BotCommandName, string> = {
  [BotCommandName.PLAY]: 'Makes the bot join the user channel',
  [BotCommandName.LEAVE]: 'Makes the bot leave the user channel',
};

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
  execute: (interaction: CommandInteraction) => Promise<void>;
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
