import {
  BotCommand,
  BotCommandName,
  newSlashCommand,
} from '../utils/bot-utils';

const command: BotCommand = {
  data: newSlashCommand(BotCommandName.PLAY),
  execute: async interaction => {
    await interaction.reply('Pong!');
  },
};

export default command;
