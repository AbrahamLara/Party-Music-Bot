import { CommandInteraction } from 'discord.js';
import {
  BotCommand,
  BotCommandName,
  newSlashCommand,
} from '../utils/bot-utils';

const command: BotCommand = {
  data: newSlashCommand(BotCommandName.PLAY),
  execute: async interaction => {
    await (interaction as CommandInteraction).reply('Play youtube video!');
  },
};

export default command;
