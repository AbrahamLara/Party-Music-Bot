import {
  BotCommand,
  BotCommandName,
  newSlashCommand,
} from '../utils/bot-utils';

const command: BotCommand = {
  data: newSlashCommand(BotCommandName.PLAY),
  execute: async interaction => {
    await interaction.reply('Play youtube video!');
  },
};

export default command;
