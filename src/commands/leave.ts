import { getVoiceConnection } from '@discordjs/voice';
import { CommandInteraction, GuildMember } from 'discord.js';
import {
  BotCommand,
  BotCommandName,
  newSlashCommand,
} from '../utils/bot-utils';

const command: BotCommand = {
  data: newSlashCommand(BotCommandName.LEAVE),
  execute: async interaction => {
    const { channel } = (interaction.member as GuildMember).voice;
    if (channel) {
      const connection = getVoiceConnection(channel.guild.id);
      if (connection) {
        connection.destroy();
      }
      await (interaction as CommandInteraction).reply(`Disconnected from ${channel.name}`);
    }
  },
};

export default command;
