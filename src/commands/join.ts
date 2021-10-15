import { DiscordGatewayAdapterCreator, joinVoiceChannel } from '@discordjs/voice';
import { CommandInteraction, GuildMember } from 'discord.js';
import {
  BotCommand,
  BotCommandName,
  newSlashCommand,
} from '../utils/bot-utils';

const command: BotCommand = {
  data: newSlashCommand(BotCommandName.JOIN),
  execute: async interaction => {
    const { channel } = (interaction.member as GuildMember).voice;
    if (channel) {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
      });
      await (interaction as CommandInteraction).reply(`Connected to ${channel.name}`);
    }
  },
};

export default command;
