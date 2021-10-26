import { CommandInteraction, Interaction, Message } from 'discord.js';

/**
 * A set of available bot command names.
 */
export enum BotCommandName {
  JOIN = 'join',
  LEAVE = 'leave',
  PAUSE = 'pause',
  PLAY = 'play',
  RESUME = 'resume',
  SKIP = 'skip',
  STOP = 'stop',
}

// An object of bot command descriptions.
export const BOT_COMMAND_DESCRIPTION: Record<BotCommandName, string> = {
  [BotCommandName.JOIN]: 'Makes the bot join a server channel',
  [BotCommandName.LEAVE]: 'Makes the bot leave a server channel',
  [BotCommandName.PAUSE]: 'Pauses the currently played track',
  [BotCommandName.PLAY]: 'Plays a youtube video given a url or search term',
  [BotCommandName.RESUME]: 'Resumes the previously paused track',
  [BotCommandName.SKIP]: 'Skips the currently played track',
  [BotCommandName.STOP]: 'Stops the audio player and clears the tracks',
};

// A Bot interaction is a combination of a normal interaction and command interaction so that we can easily access
// methods from each object at the same time.
type BotInteraction = Interaction & CommandInteraction;

/**
 * An executable bot command.
 */
export interface BotCommand {
  /**
   * The slash command builder that creates a command for the bot to recognize.
   */
  name: BotCommandName;

  /**
   * The function to call for a bot command.
   *
   * @param message A message object.
   * @param value The value passed into the invoked command.
   */
  execute: (message: Message, value: string) => Promise<void>;
}

/**
 * Retrieves the member channel object from the provided Message object.
 */
export function getMemberChannel(message: Message) {
  return message.member?.voice.channel;
}
