import {
  BotCommand,
  BotCommandName,
  getMemberChannel,
} from '../utils/bot-utils';
import { getClient } from '../utils/client-utils';

// The resume command will unpause a currently paused audio track.
const command: BotCommand = {
  name: BotCommandName.RESUME,
  execute: async message => {
    const channel = getMemberChannel(message);

    if (channel) {
      const subscription = getClient().subscriptions.get(channel.guild.id);

      if (subscription) {
        subscription.audioPlayer.unpause();
        await message.reply('YouTube track has been resumed.');
      }
    }
  },
};

export default command;
