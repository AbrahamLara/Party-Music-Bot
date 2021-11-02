import { getVoiceConnection } from '@discordjs/voice';
import {
  BotCommand,
  BotCommandName,
  getMemberChannel,
} from '../utils/bot-utils';
import YouTubeTrack from '../YouTubeTrack';
import { getClient } from '../utils/client-utils';

// The play command will add a youtube track to a set of audio tracks from a subscription.
const command: BotCommand = {
  name: BotCommandName.PLAY,
  execute: async (message, youTubeURL) => {
    const channel = getMemberChannel(message);

    if (channel) {
      const guildID = channel.guild.id;
      const connection = getVoiceConnection(guildID);
      const client = getClient();

      // If a youtube url is provided we should added it to the audio tracks.
      if (connection && youTubeURL) {
        const subscription = client.subscriptions.get(guildID);

        if (subscription) {
          subscription.addTrack(new YouTubeTrack(youTubeURL));
          await message.reply('Added new youtube track to play!');
        }
      }
    }
  },
};

export default command;
