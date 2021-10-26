import {
  BotCommand,
  BotCommandName,
  getMemberChannel,
} from '../utils/bot-utils';
import { getClient } from '../utils/client-utils';

// The pause command will pause a currently playing audio track.
const command: BotCommand = {
  name: BotCommandName.PAUSE,
  execute: async message => {
    const channel = getMemberChannel(message);

    if (channel) {
      const subscription = getClient().subscriptions.get(channel.guild.id);

      if (subscription) {
        subscription.audioPlayer.pause();
        await message.reply('YouTube track has been paused.');
      }
    }
  },
};

export default command;
