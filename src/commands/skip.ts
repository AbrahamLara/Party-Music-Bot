import {
  BotCommand,
  BotCommandName,
  getMemberChannel,
} from '../utils/bot-utils';
import { getClient } from '../utils/client-utils';

// The skip command will stop the currently played track so that the bot can play the next track.
const command: BotCommand = {
  name: BotCommandName.SKIP,
  execute: async message => {
    const channel = getMemberChannel(message);

    if (channel) {
      const subscription = getClient().subscriptions.get(channel.guild.id);

      if (subscription) {
        // Stopping the currently playing track will put the bot in an idle state which will cause it to process the
        // next track if one is available. This is because of the state change listener in the party subscription that
        // is set up to process the next track once the audio is idle.
        subscription.audioPlayer.stop();
        await message.reply('Skipping YouTube track.');
      }
    }
  },
};

export default command;
