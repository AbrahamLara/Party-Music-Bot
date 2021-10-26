import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  VoiceConnection,
} from '@discordjs/voice';
import {
  BotCommand,
  BotCommandName,
  getMemberChannel,
} from '../utils/bot-utils';
import { getClient } from '../utils/client-utils';
import PartySubscription from '../PartySubscription';

// The join command forces the bot to join the same voice channel as the user who invoked the command.
const command: BotCommand = {
  name: BotCommandName.JOIN,
  execute: async message => {
    const channel = getMemberChannel(message);

    if (channel) {
      const {
        id,
        guild: { id: guildID, voiceAdapterCreator },
      } = channel;
      // Make the bot join the user's voice channel.
      const connection = joinVoiceChannel({
        channelId: id,
        guildId: guildID,
        adapterCreator: voiceAdapterCreator as DiscordGatewayAdapterCreator,
      });
      addGuildPartySubscription(connection, guildID);

      // If the current voice connection does not have a subscription, we should set one for it so that it can stream
      // audio through the bot.

      // Have the bot reply to the user that it has connected to the channel.
      await message.reply(`Connected to ${channel.name}`);
    }
  },
};

/**
 * Adds a guild party subscription so that multiple voice connections using that bot can have their own audio player
 * and tracks.
 */
function addGuildPartySubscription(
  connection: VoiceConnection,
  guildID: string,
) {
  const client = getClient();

  if (!client.subscriptions.has(guildID)) {
    const subscription = new PartySubscription(connection);
    client.subscriptions.set(guildID, subscription);
  }
}

export default command;
