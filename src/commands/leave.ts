import { getVoiceConnection } from '@discordjs/voice';
import {
  BotCommand,
  BotCommandName,
  getMemberChannel,
} from '../utils/bot-utils';
import { getClient } from '../utils/client-utils';

// The leave command makes the bot leave the voice channel is has connect to by destroying its voice connection.
const command: BotCommand = {
  name: BotCommandName.LEAVE,
  execute: async message => {
    const channel = getMemberChannel(message);

    if (channel) {
      const { id } = channel.guild;
      const connection = getVoiceConnection(id);
      // Once we've confirmed an active voice connection exists, destroy the connection to make the bot leave the
      // voice channel it's in and have the bot reply to the user that it has successfully left the channel.
      if (connection) {
        removeGuildPartySubscription(id);
        connection.destroy();

        await message.reply(`Disconnected from ${channel.name}`);
      } else {
        await message.reply(`I'm not in ${channel.name}`);
      }
    } else {
      // If there is no connection to destroy, then let the user know the bot isn't in a channel.
      await message.reply("I'm not currently connected to a voice channel!");
    }
  },
};

/**
 * Removes the guild party subscription using the provided guild id.
 */
function removeGuildPartySubscription(guildID: string) {
  const client = getClient();

  if (client.subscriptions.has(guildID)) {
    // Stop the audio player from playing music.
    client.subscriptions.get(guildID)?.audioPlayer.stop(true);
    client.subscriptions.delete(guildID);
  }
}

export default command;
