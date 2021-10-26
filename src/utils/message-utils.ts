import { BotCommandName } from './bot-utils';

/**
 * The command details such as the command that was invoked and the value passed with the command, such as a url.
 */
interface BotCommandDetails {
  /**
   * The name of the command that was invoked.
   */
  name: BotCommandName;

  /**
   * The value passed into the invoked command.
   */
  value: string;
}

/**
 * Returns the bot command name the user is attempting to invoke. If the user attempts to invoke a bot command name that
 * is not registered, this function will return null.
 */
export function getBotCommandDetails(
  message: string,
): BotCommandDetails | null {
  if (!message.startsWith('!')) {
    return null;
  }

  const content = message.split(' ');
  const commandName = content[0].replace('!', '');
  const botCommandNameValues: string[] = Object.values(BotCommandName);
  const isValidCommand = botCommandNameValues.includes(commandName);

  if (isValidCommand) {
    // TODO: Remove trimming the string once we support video search.
    const commandValue = message.replace(`!${commandName}`, '').trim();
    return { name: commandName as BotCommandName, value: commandValue };
  }

  return null;
}
