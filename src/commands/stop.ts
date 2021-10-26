import {
  BotCommand,
  BotCommandName,
  getMemberChannel,
} from '../utils/bot-utils';
import { getClient } from '../utils/client-utils';

// The close command will stop the currently playing audio track and clear any tracks that were set.
const command: BotCommand = {
  name: BotCommandName.STOP,
  execute: async message => {
    const channel = getMemberChannel(message);

    if (channel) {
      const subscription = getClient().subscriptions.get(channel.guild.id);

      if (subscription) {
        subscription.clearTracks();
        await message.reply('Cleared audio tracks.');
      }
    }
  },
};

export default command;
